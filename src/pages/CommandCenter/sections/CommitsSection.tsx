import { createResource, createSignal, createMemo, For, Show, onMount, type Component } from "solid-js"
import SectionShell, { SectionInternalHeader } from "./SectionShell"
import { openExternal } from "../../../store/commandStore"

// ─── GitHub public API ────────────────────────────────────────────────────────
// No auth required — GitHub's public Events API surfaces recent PushEvents
// for any public profile. This is the "right" public endpoint: it needs no
// token and only ever exposes what's already public.

const GITHUB_USER = "hiiamarthur"
const EVENTS_URL = `https://api.github.com/users/${GITHUB_USER}/events/public`

interface CommitEntry {
  id: string
  repo: string
  sha: string
  message: string
  url: string
  author: string
  date: string
}

interface GithubPushEvent {
  id: string
  type: string
  created_at: string
  repo: { name: string }
  // GitHub's public (unauthenticated) events API only exposes the resulting
  // commit SHA on a push, not the message — that requires a follow-up call
  // to the commits endpoint below.
  payload: { head?: string }
}

interface GithubCommitDetail {
  sha: string
  html_url: string
  commit: { message: string; author: { name: string; date: string } }
}

const MAX_PUSH_EVENTS = 25

async function fetchCommits(): Promise<CommitEntry[]> {
  const res = await fetch(EVENTS_URL, { headers: { Accept: "application/vnd.github+json" } })
  if (!res.ok) throw new Error(`GitHub API ${res.status}`)
  const events = (await res.json()) as GithubPushEvent[]

  const pushes = events.filter((e) => e.type === "PushEvent" && e.payload.head).slice(0, MAX_PUSH_EVENTS)

  const results = await Promise.allSettled(
    pushes.map(async (event) => {
      const url = `https://api.github.com/repos/${event.repo.name}/commits/${event.payload.head}`
      const r = await fetch(url, { headers: { Accept: "application/vnd.github+json" } })
      if (!r.ok) throw new Error(`commit fetch ${r.status}`)
      const detail = (await r.json()) as GithubCommitDetail
      const entry: CommitEntry = {
        id: `${event.id}-${detail.sha}`,
        repo: event.repo.name,
        sha: detail.sha.slice(0, 7),
        message: detail.commit.message.split("\n")[0],
        url: detail.html_url,
        author: detail.commit.author.name,
        date: event.created_at,
      }
      return entry
    })
  )

  return results
    .filter((r): r is PromiseFulfilledResult<CommitEntry> => r.status === "fulfilled")
    .map((r) => r.value)
}

const relativeTime = (iso: string) => {
  const s = Math.floor((Date.now() - new Date(iso).getTime()) / 1000)
  if (s < 60) return `${s}s ago`
  const m = Math.floor(s / 60)
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  const d = Math.floor(h / 24)
  if (d < 30) return `${d}d ago`
  return `${Math.floor(d / 30)}mo ago`
}

// Deterministic accent per repo, so each repo reads as its own "channel"
const REPO_PALETTE = ["#4ade80", "#22d3ee", "#a855f7", "#f59e0b", "#f472b6", "#818cf8", "#34d399"]
const colorForRepo = (repo: string) => {
  let h = 0
  for (let i = 0; i < repo.length; i++) h = (h * 31 + repo.charCodeAt(i)) >>> 0
  return REPO_PALETTE[h % REPO_PALETTE.length]
}

// ─── Contribution calendar ────────────────────────────────────────────────────
// github-contributions-api.jogruber.de mirrors GitHub's own contribution
// calendar (date / count / level per day) as a small CORS-enabled JSON API —
// GitHub's own github.com/users/{u}/contributions endpoint has no CORS
// headers, so it can't be fetched directly from a browser.

const CONTRIB_URL = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`

interface ContribDay { date: string; count: number; level: number }
interface ContribResponse { total: Record<string, number>; contributions: ContribDay[] }

async function fetchContributions(): Promise<ContribResponse> {
  const res = await fetch(CONTRIB_URL)
  if (!res.ok) throw new Error(`contributions API ${res.status}`)
  return (await res.json()) as ContribResponse
}

const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const DOW_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""]

const buildWeeks = (days: ContribDay[]): (ContribDay | null)[][] => {
  const weeks: (ContribDay | null)[][] = []
  let week: (ContribDay | null)[] = []
  const firstDow = new Date(`${days[0].date}T00:00:00`).getDay()
  for (let i = 0; i < firstDow; i++) week.push(null)
  for (const d of days) {
    week.push(d)
    if (week.length === 7) { weeks.push(week); week = [] }
  }
  if (week.length > 0) {
    while (week.length < 7) week.push(null)
    weeks.push(week)
  }
  return weeks
}

const monthLabelsFor = (weeks: (ContribDay | null)[][]): (string | null)[] => {
  let last = -1
  return weeks.map((week) => {
    const day = week.find((d): d is ContribDay => d !== null)
    if (!day) return null
    const month = new Date(`${day.date}T00:00:00`).getMonth()
    if (month === last) return null
    last = month
    return MONTH_LABELS[month]
  })
}

const levelColor = (level: number, color: string) => {
  switch (level) {
    case 1:  return `${color}35`
    case 2:  return `${color}65`
    case 3:  return `${color}95`
    case 4:  return color
    default: return "rgba(255,255,255,0.05)"
  }
}

// ─── Commit row ────────────────────────────────────────────────────────────────

const CommitRow: Component<{ entry: CommitEntry }> = (props) => (
  <button
    onClick={() => openExternal(props.entry.url, `${props.entry.repo}@${props.entry.sha}`)}
    class="group w-full flex items-center gap-3 px-3 py-2 text-left rounded hover:bg-white/[0.03] transition-colors duration-150 border-b border-white/[0.03]"
  >
    <span class="font-mono text-[10px] text-slate-600 tabular-nums flex-shrink-0 w-14">
      {relativeTime(props.entry.date)}
    </span>
    <span
      class="font-mono text-[10px] tracking-wide flex-shrink-0 truncate max-w-[150px]"
      style={{ color: colorForRepo(props.entry.repo) }}
    >
      {props.entry.repo.split("/")[1] ?? props.entry.repo}
    </span>
    <span class="font-mono text-sm text-slate-300 group-hover:text-white flex-1 min-w-0 truncate transition-colors duration-150">
      {props.entry.message}
    </span>
    <span class="font-mono text-[10px] text-slate-700 tabular-nums flex-shrink-0">
      {props.entry.sha}
    </span>
  </button>
)

// ─── Contribution grid ─────────────────────────────────────────────────────────

const ContributionGrid: Component<{ data: ContribResponse; color: string }> = (props) => {
  const [hovered, setHovered] = createSignal<ContribDay | null>(null)
  const weeks = createMemo(() => buildWeeks(props.data.contributions))
  const months = createMemo(() => monthLabelsFor(weeks()))

  let scrollRef: HTMLDivElement | undefined
  onMount(() => {
    // Default to the most recent weeks (right edge) — scrolling left reveals history.
    if (scrollRef) scrollRef.scrollLeft = scrollRef.scrollWidth
  })

  return (
    <div class="border border-white/[0.06] rounded-lg bg-[#0a0a0a]/60 px-4 py-3">
      <div class="flex items-center justify-between mb-3">
        <span class="font-mono text-[10px] tracking-[0.2em] text-slate-500 uppercase">
          Contribution Grid — {props.data.total.lastYear ?? 0} in the last year
        </span>
        <span class="font-mono text-[10px] text-slate-600 h-[14px]">
          {hovered() ? `${hovered()!.date} · ${hovered()!.count} contribution${hovered()!.count === 1 ? "" : "s"}` : ""}
        </span>
      </div>

      <div ref={scrollRef} class="overflow-x-auto" style={{ "scrollbar-width": "thin", "scrollbar-color": `${props.color}25 transparent` }}>
        <div class="flex gap-[3px] w-max" onMouseLeave={() => setHovered(null)}>

          {/* Day-of-week row labels */}
          <div class="flex flex-col gap-[3px] pt-[16px] pr-1 flex-shrink-0">
            <For each={DOW_LABELS}>
              {(label) => (
                <div class="h-[10px] leading-[10px] font-mono text-[8px] text-slate-600 text-right w-6">
                  {label}
                </div>
              )}
            </For>
          </div>

          {/* Weeks */}
          <div class="flex flex-col">
            <div class="flex gap-[3px] mb-1 h-[13px]">
              <For each={weeks()}>
                {(_, wi) => (
                  <span class="w-[10px] font-mono text-[8px] text-slate-600 whitespace-nowrap overflow-visible leading-[13px]">
                    {months()[wi()] ?? ""}
                  </span>
                )}
              </For>
            </div>
            <div class="flex gap-[3px]">
              <For each={weeks()}>
                {(week) => (
                  <div class="flex flex-col gap-[3px]">
                    <For each={week}>
                      {(day) => (
                        <div
                          class="w-[10px] h-[10px] rounded-[2px] transition-transform duration-100"
                          style={{
                            background: day ? levelColor(day.level, props.color) : "transparent",
                            "box-shadow": day && day.level >= 4 ? `0 0 4px ${props.color}90` : "none",
                            transform: day && hovered()?.date === day.date ? "scale(1.35)" : "scale(1)",
                            cursor: day ? "pointer" : "default",
                          }}
                          onMouseEnter={() => day && setHovered(day)}
                        />
                      )}
                    </For>
                  </div>
                )}
              </For>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div class="flex items-center justify-end gap-1.5 mt-2 font-mono text-[8px] text-slate-600">
        <span>Less</span>
        <For each={[0, 1, 2, 3, 4]}>
          {(lvl) => (
            <div
              class="w-[9px] h-[9px] rounded-[2px]"
              style={{ background: levelColor(lvl, props.color) }}
            />
          )}
        </For>
        <span>More</span>
      </div>
    </div>
  )
}

// ─── CommitsSection ─────────────────────────────────────────────────────────────

const COLOR = "#4ade80"

const CommitsSection: Component = () => {
  const [commits, { refetch: refetchCommits }] = createResource(fetchCommits)
  const [contributions, { refetch: refetchContributions }] = createResource(fetchContributions)
  const [headerActive, setHeaderActive] = createSignal(false)
  setTimeout(() => setHeaderActive(true), 160)

  return (
    <SectionShell codename="GIT_LOG" label="Live Commit Feed" color={COLOR}>
      <div class="max-w-5xl mx-auto py-10 px-8 flex flex-col flex-1 w-full min-h-0">

        <SectionInternalHeader
          label="Live Commit Feed"
          color={COLOR}
          active={headerActive()}
          meta={
            commits.loading
              ? "SYNCING…"
              : commits.error
              ? "SIGNAL LOST"
              : `${commits()?.length ?? 0} COMMITS · GITHUB.COM/${GITHUB_USER.toUpperCase()}`
          }
        />

        {/* Contribution heatmap */}
        <div class="mb-5 flex-shrink-0">
          <Show when={contributions.loading}>
            <div class="flex items-center gap-2 px-4 py-6 font-mono text-xs text-slate-500 border border-white/[0.06] rounded-lg">
              <span class="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: COLOR }} />
              Loading contribution calendar…
            </div>
          </Show>
          <Show when={contributions.error}>
            <div class="px-4 py-6 font-mono text-xs text-rose-400/80 border border-white/[0.06] rounded-lg">
              // unable to reach the contributions API.{" "}
              <button
                onClick={() => refetchContributions()}
                class="underline decoration-dotted underline-offset-2 hover:text-rose-300"
              >
                retry
              </button>
            </div>
          </Show>
          <Show when={contributions()}>
            <ContributionGrid data={contributions()!} color={COLOR} />
          </Show>
        </div>

        {/* Terminal command line */}
        <div class="flex items-center gap-2 mb-3 font-mono text-[11px] text-slate-600 flex-shrink-0">
          <span style={{ color: `${COLOR}90` }}>$</span>
          <span>git log --all --oneline --source -n 40</span>
          <button
            onClick={() => refetchCommits()}
            class="ml-auto flex items-center gap-1.5 px-2 py-1 rounded border border-white/8 hover:border-white/20 hover:bg-white/[0.03] transition-all duration-150 text-slate-500 hover:text-slate-300"
            title="Refresh"
          >
            <svg class="w-2.5 h-2.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M13 3v4h-4M3 13v-4h4M3.5 6a5 5 0 018.9-2M12.5 10a5 5 0 01-8.9 2" />
            </svg>
            <span class="text-[9px] tracking-wider uppercase">Refresh</span>
          </button>
        </div>

        <div class="flex-1 min-h-0 border border-white/[0.06] rounded-lg overflow-hidden bg-[#0a0a0a]/60">
          <div class="h-full overflow-y-auto" style={{ "scrollbar-width": "thin", "scrollbar-color": `${COLOR}25 transparent` }}>

            <Show when={commits.loading}>
              <div class="flex items-center gap-2 px-4 py-6 font-mono text-xs text-slate-500">
                <span class="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: COLOR }} />
                Fetching commit history from api.github.com…
              </div>
            </Show>

            <Show when={commits.error}>
              <div class="px-4 py-6 font-mono text-xs text-rose-400/80 leading-relaxed">
                // unable to reach GitHub's public API — rate limited or offline.
                <br />
                <button
                  onClick={() => refetchCommits()}
                  class="mt-2 underline decoration-dotted underline-offset-2 hover:text-rose-300"
                >
                  retry
                </button>
              </div>
            </Show>

            <Show when={!commits.loading && !commits.error && commits()?.length === 0}>
              <div class="px-4 py-6 font-mono text-xs text-slate-500">
                No public push events in the last 90 days.
              </div>
            </Show>

            <Show when={!commits.loading && commits() && commits()!.length > 0}>
              <For each={commits()}>{(entry) => <CommitRow entry={entry} />}</For>
            </Show>

          </div>
        </div>

        <div class="mt-2 font-mono text-[9px] tracking-[0.2em] text-slate-700 uppercase flex-shrink-0">
          Source: GitHub public Events API · updates as pushes land
        </div>
      </div>
    </SectionShell>
  )
}

export default CommitsSection

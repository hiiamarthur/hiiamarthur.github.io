import { Component } from 'solid-js';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import useCountUp from '../hooks/useCountUp';
import CircularProgress from '../components/circularProgressBar';
import Button2 from '../components/Buttons/Button2';

const Dashboard: Component = () => {
  // Intersection observer hooks remain the same
  const [isMainVisible, mainRef] = useIntersectionObserver();
  const [isEnvVisible, envRef] = useIntersectionObserver();
  const [isComsVisible, comsRef] = useIntersectionObserver();
  const [isTrackingVisible, trackingRef] = useIntersectionObserver();
  const [isDataVisible, dataRef] = useIntersectionObserver();

  return (
    <div class="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header class="p-6 border-b border-gray-800">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-light">
            <span class="text-cyan-400">//</span>
            <a href="/" class="text-cyan-400 hover:text-cyan-300 transition-colors">
              ARES_DASHBOARD
            </a>
          </h1>
          <div class="text-right">
            <div class="text-cyan-400 font-light">USER_LOGGED_IN</div>
            <div class="text-green-500 animate-pulse">[LIVE]</div>
          </div>
        </div>
      </header>

      <main class="p-6">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Center Column */}
          <div class="lg:col-span-6 lg:col-start-4" ref={mainRef}>
            {isMainVisible() && (
              <div class="animate-fadeIn">
                <div class="flex justify-center items-center mb-12">
                  <div class="relative">
                    <CircularProgress value={75} size={200} />
                    <div class="absolute inset-0 flex flex-col items-center justify-center">
                      <span class="text-3xl font-bold">
                        {/* {useCountUp(16540)} */}
                      </span>
                      <span class="text-cyan-400">km/h</span>
                    </div>
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div class="animate-fade-in-left">
                    <Button2>DATA_DRIVE</Button2>
                  </div>
                  <div class="animate-fade-in-right">
                  {/* <div 
  class="bg-red-500 p-4"
  style={{
    "animation": "fadeInRight 1s ease-in forwards"
  }}
> */}
                    <Button2>PO_DATABASE</Button2>
                  </div>
                  <div class="animate-fade-in-left">
                    <Button2>ACTIVE_ROUTE</Button2>
                  </div>
                  <div class="animate-fade-in-right">
                    <Button2>AUTO_PILOT</Button2>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Environment Section */}
          <div class="lg:col-span-3 lg:col-start-1" ref={envRef}>
            {isEnvVisible() && (
              <div class="bg-gray-800 rounded-lg p-6 animate-fadeIn">
                <h2 class="text-xl mb-6">Environment</h2>
                <div class="flex items-center space-x-4">
                  <div class="w-1/3">
                    <CircularProgress value={50} />
                    <span class="block text-center mt-2">PSI</span>
                  </div>
                  <div class="w-2/3">
                    <div class="text-gray-400">Pressure</div>
                    <div class="text-2xl">{`${useCountUp(15.65)}`}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div class="lg:col-span-3 space-y-6">
            {/* HQ_COMS */}
            <div ref={comsRef}>
              {isComsVisible() && (
                <div class="bg-gray-800 rounded-lg p-6 animate-fadeIn">
                  <h2 class="text-xl mb-6">HQ_COMS</h2>
                  <div class="grid grid-cols-2 gap-4">
                    {[40, 60, 80, 90, 20, 30].map((value, index) => (
                      <div class="text-xl text-gray-300">
                        C{index + 1} [{value}]
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* POS_TRACKING */}
            <div ref={trackingRef}>
              {isTrackingVisible() && (
                <div class="bg-gray-800 rounded-lg p-6 animate-fadeIn">
                  <h2 class="text-xl mb-6">POS_TRACKING</h2>
                  <div class="space-y-4">
                    {['X: 95', 'Y: 49', 'Z: 59', 'V: +60'].map(label => (
                      <div>
                        <div class="text-gray-300 font-semibold mb-2">{label}</div>
                        <div class="bg-gray-700 rounded-full h-2">
                          <div 
                            class="bg-cyan-400 h-full rounded-full transition-all duration-300"
                            style={{ width: `${parseInt(label.split(':')[1])}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* DATA_STREAM */}
            <div ref={dataRef}>
              {isDataVisible() && (
                <div class="bg-gray-800 rounded-lg p-6 animate-fadeIn">
                  <h2 class="text-xl mb-6">DATA_STREAM</h2>
                  <div class="grid grid-cols-3 gap-4">
                    {[
                      { label: 'AT1', value: 148 },
                      { label: 'SR1', value: 30 },
                      { label: 'AF1', value: 123 },
                      { label: 'AT2', value: 180 },
                      { label: 'SR2', value: 680 },
                      { label: 'AF2', value: 15 }
                    ].map(item => (
                      <div>
                        <div class="text-sm text-gray-400">{item.label}</div>
                        <div class="text-lg text-green-500">
                          {`${useCountUp(item.value, 4000)}`}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
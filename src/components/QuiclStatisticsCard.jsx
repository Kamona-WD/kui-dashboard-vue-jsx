import { defineComponent, onMounted, ref, Transition } from 'vue'
import ApexCharts from 'apexcharts'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import Button from '@/components/Button'
import { ChartBarIcon, TrendingUpIcon, TrendingDownIcon, MinusIcon, DotsHorizontalIcon } from '@heroicons/vue/outline'
import { RouterLink } from 'vue-router'

export default defineComponent({
  props: {
    title: String,
    result: [String, Number],
    status: {
      type: String,
      default: 'success',
      validator(value) {
        return ['success', 'warning', 'danger'].includes(value)
      },
    },
    percentage: {
      type: [String, Number],
    },
    actionLink: {
      type: [String, Object],
      default: '#',
    },
    chartData: {
      type: [Array, Object],
      default: () => ({
        data: [],
        categories: [],
      }),
    },
  },

  setup(props, { slots }) {
    const chartEl = ref(null)

    onMounted(() => {
      let chart = new ApexCharts(chartEl.value, {
        series: [
          {
            name: props.title,
            data: props.chartData.data ?? props.chartData,
          },
        ],
        chart: {
          height: '100%',
          width: '100%',
          type: 'line',
          toolbar: {
            show: false,
          },
          sparkline: {
            enabled: true,
          },
        },
        stroke: {
          width: 2,
          curve: 'smooth',
        },
        grid: {
          show: false,
          padding: {
            left: 0,
            right: 0,
          },
          xaxis: {
            lines: {
              show: false,
            },
          },
          yaxis: {
            lines: {
              show: false,
            },
          },
        },
        xaxis: {
          type: 'datetime',
          categories: props.chartData.categories ?? [
            '1/11/2000',
            '2/11/2000',
            '3/11/2000',
            '4/11/2000',
            '5/11/2000',
            '6/11/2000',
            '7/11/2000',
            '8/11/2000',
            '9/11/2000',
            '10/11/2000',
            '11/11/2000',
            '12/11/2000',
            '1/11/2001',
          ],
          tickAmount: 10,
          labels: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        title: {
          show: false,
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            gradientToColors: ['#FDD835'],
            shadeIntensity: 1,
            type: 'horizontal',
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100, 100, 100],
          },
        },
        yaxis: {
          labels: {
            show: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        tooltip: {
          x: { show: false },
        },
      })

      chart.render()
    })

    return () => (
      <div class="flex flex-col gap-2 p-4 bg-white rounded-md shadow-md dark:bg-dark-eval-1">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-6">
            {slots.icon ? (
              slots.icon({ sizeClasses: 'w-8 h-8 text-purple-500' })
            ) : (
              <ChartBarIcon aria-hidden="true" class="w-8 h-8 text-purple-500" />
            )}

            <div class="flex items-center gap-2">
              <span
                class={[
                  'p-0.5 block rounded-full',
                  {
                    'bg-green-100 dark:bg-green-800': props.status == 'success',
                    'bg-yellow-100 dark:bg-yellow-800': props.status == 'warning',
                    'bg-red-100 dark:bg-red-800': props.status == 'danger',
                  },
                ]}
              >
                <TrendingUpIcon
                  v-show={props.status == 'success'}
                  aria-hidden="true"
                  class="w-4 h-4 text-green-500 dark:text-green-200"
                />
                <MinusIcon
                  v-show={props.status == 'warning'}
                  aria-hidden="true"
                  class="w-4 h-4 text-yellow-500 dark:text-yellow-200"
                />
                <TrendingDownIcon
                  v-show={props.status == 'danger'}
                  aria-hidden="true"
                  class="w-4 h-4 text-red-500 dark:text-red-200"
                />
              </span>

              <span
                class={[
                  'text-xs font-medium',
                  {
                    'text-green-500': status == 'success',
                    'text-yellow-500': status == 'warning',
                    'text-red-500': status == 'danger',
                  },
                ]}
              >
                {props.percentage}
              </span>
            </div>
          </div>

          {/* Card action */}
          <Menu as="div" class="relative">
            <MenuButton as="span">
              <Button iconOnly size="sm" variant="secondary">
                {({ iconSizeClasses }) => (
                  <>
                    <span class="sr-only">Card Actions</span>
                    <DotsHorizontalIcon aria-hidden="true" class={iconSizeClasses} />
                  </>
                )}
              </Button>
            </MenuButton>

            <Transition
              enter-active-class="transition duration-100 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-75 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <MenuItems class="absolute z-30 right-0 w-40 mt-2 origin-top-right bg-white dark:bg-dark-eval-1 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div class="px-1 py-1">
                  {slots.actions ? (
                    slots.actions()
                  ) : (
                    <MenuItem>
                      {({ active }) => (
                        <RouterLink
                          class={[
                            'block w-full px-4 py-2 text-sm leading-5 text-left  transition duration-150 ease-in-out',
                            'focus:outline-none',
                            {
                              'bg-gray-100 dark:text-white dark:bg-dark-eval-3': active,
                              'text-gray-700 dark:text-gray-400': !active,
                            },
                          ]}
                          to={props.actionLink}
                        >
                          View
                        </RouterLink>
                      )}
                    </MenuItem>
                  )}
                </div>
              </MenuItems>
            </Transition>
          </Menu>
        </div>

        <div class="relative grid grid-cols-2">
          <div>
            <h4 class="text-3xl font-semibold">{props.result}</h4>
            <p class="text-base font-medium text-gray-500">{props.title}</p>
          </div>
          <div class="relative flex items-center max-h-16">
            <div ref={chartEl}></div>
          </div>
        </div>
      </div>
    )
  },
})

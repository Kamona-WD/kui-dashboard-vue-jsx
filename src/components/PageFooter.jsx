import { defineComponent } from 'vue'
import { HeartIcon } from '@heroicons/vue/solid'

export default defineComponent({
  setup() {
    return () => (
      <footer class="w-full flex flex-col flex-shrink-0 gap-2 px-6 py-4 lg:flex-row lg:justify-between">
        <p class="text-sm text-gray-500 dark:text-gray-400">
          &#169;
          <span>{new Date().getFullYear()}</span> K UI, All rights reserved
        </p>

        <p class="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
          <span>Hand-crafted & Made with</span>
          <span>
            <span class="sr-only">love</span>
            <HeartIcon aria-hidden="true" class="w-6 h-6 text-red-500" />
          </span>
          <span>by</span>
          <a href="https://github.com/Kamona-WD" target="_blank" class="text-blue-600 hover:underline">
            Ahmed Kamel
          </a>
        </p>
      </footer>
    )
  },
})

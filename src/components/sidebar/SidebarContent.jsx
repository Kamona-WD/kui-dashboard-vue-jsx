import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import PerfrectScrollbar from '@/components/perfect-scrollbar'
import SidebarLink from '@/components/sidebar/SidebarLink'
import { DashboardIcon } from '@/components/icons/outline'
import { ShieldCheckIcon } from '@heroicons/vue/outline'
import SidebarCollapsible from '@/components/sidebar/SidebarCollapsible'
import SidebarCollapsibleItem from '@/components/sidebar/SidebarCollapsibleItem'

export default defineComponent({
  setup() {
    const isCurrentRoute = (routeName) => {
      return useRouter().currentRoute.value.name == routeName
    }

    return () => (
      <PerfrectScrollbar tagname="nav" aria-label="main" class="relative flex flex-col flex-1 max-h-full gap-4 px-3">
        <SidebarLink
          title="Dashboard"
          to={{ name: 'Dashboard' }}
          active={isCurrentRoute('Dashboard')}
          v-slots={{
            icon: () => <DashboardIcon class="flex-shrink-0 w-6 h-6" aria-hidden="true" />,
          }}
        />

        <SidebarCollapsible
          title="Authentication"
          v-slots={{ icon: () => <ShieldCheckIcon class="flex-shrink-0 w-6 h-6" aria-hidden="true" /> }}
        >
          <SidebarCollapsibleItem to={{ name: 'Login' }} title="Login" />
          <SidebarCollapsibleItem to={{ name: 'Register' }} title="Register" />
          <SidebarCollapsibleItem to={{ name: 'VerifyEmail' }} title="VerifyEmail" />
          <SidebarCollapsibleItem to={{ name: 'ForgotPassword' }} title="ForgotPassword" />
          <SidebarCollapsibleItem to={{ name: 'ResetPassword' }} title="ResetPassword" />
          <SidebarCollapsibleItem to={{ name: 'ConfirmPassword' }} title="ConfirmPassword" />
        </SidebarCollapsible>
      </PerfrectScrollbar>
    )
  },
})

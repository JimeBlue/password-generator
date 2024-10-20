const defaults = {
  ring: 'ring-1 ring-inset focus:ring-inset',
  padding: {
    sm: 'px-4 py-4 group-has-[label]/floating:pt-6',
  },
  height: 'h-5',
  size: 'size-4',
}

const inputDefinition = {
  padding: {
    sm: defaults.padding.sm,
  },
  color: {
    white: {
      outline: `${defaults.ring} !shadow-none`,
    },
  },
  variant: {
    outline: `bg-white ${defaults.ring} !shadow-none`,

  },
}

const floatingLabel = `
  group-has-[label]/floating:z-10 group-has-[label]/floating:pointer-events-none group-has-[label]/floating:absolute group-has-[label]/floating:left-2 group-has-[label]/floating:top-1
  group-has-[label]/floating:translate-y-1 group-has-[label]/floating:bg-white group-has-[label]/floating:px-2 group-has-[label]/floating:text-xs group-has-[label]/floating:text-gray-500 group-has-[label]/floating:transition-all
  group-has-[:placeholder-shown:not(:focus-visible)]/floating:translate-y-1/2 group-has-[:placeholder-shown:not(:focus-visible)]/floating:text-base
  group-has-[:focus-visible:not(:placeholder-shown)]/floating:translate-y-1 group-has-[:focus-visible:not(:placeholder-shown)]/floating:text-xs
  group-data-[selected="false"]/floating:translate-y-1/2 group-data-[selected="false"]/floating:text-base
  group-has-[[data-headlessui-state=open]]/floating:!translate-y-1 group-has-[[data-headlessui-state=open]]/floating:!text-xs
  `

export default defineAppConfig({
  ui: {
    primary: 'brand',
    gray: 'cool',
    error: 'ring-8',
    icons: {
      dynamic: true,
    },
    alert: {
      rounded: 'rounded',
    },
    badge: {
      size: {
        xs: 'text-[10px] px-2 py-0.5',
      },
    },
    button: {
      rounded: 'rounded-none',
      size: {
        lg: 'text-lg',

      },
      color: {
        gray: {
          shadow: 'shadow-none',
        },
        lightBlue: {
          ghost: 'text-gray-900 dark:text-white hover:bg-blue-100 dark:hover:bg-gray-900 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400',
        },
      },
      variant: {
        solid: 'py-5 shadow-sm text-gray-900 hover:bg-transparent dark:text-gray-900 hover:text-brand-500 uppercase font-bold bg-{color}-500 hover:bg-transparent ring-2 ring-{color}-500  disabled:bg-{color}-500 aria-disabled:bg-{color}-500 dark:bg-{color}-400 dark:hover:bg-{color}-500 dark:disabled:bg-{color}-400 dark:aria-disabled:bg-{color}-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-{color}-500 dark:focus-visible:outline-{color}-400',
        outline: 'ring-1',
      },
      default: {
        size: 'lg',
      },
    },
    buttonGroup: {
      shadow: 'shadow-none',
    },
    formGroup: {
      wrapper: 'relative',
      container: 'group-has-[label]/floating:mt-0',
      size: {
        '2xs': 'text-xs',
        'xs': 'text-xs',
        'sm': 'text-sm',
        'md': 'text-sm',
        'lg': 'text-lg',
        'xl': 'text-xl',
      },
      label: { base: `text-primary-500 ${floatingLabel} flex items-center order-1`, required: 'group-has-[label]/floating:after:text-current' },
      description: 'mt-1 text-gray-800',

    },
    input: inputDefinition,
    textarea: inputDefinition,
    select: { ...inputDefinition },
    selectMenu: {
      input: `${defaults.padding.sm}`,
      color: inputDefinition.color,
      variant: inputDefinition.variant,
    },
    checkbox: {
      wrapper: 'relative flex items-center',
      container: defaults.height,
      base: 'h-5 w-5 dark:checked:bg-current dark:checked:border-transparent dark:indeterminate:bg-current dark:indeterminate:border-transparent disabled:opacity-50 disabled:cursor-not-allowed focus:ring-0 focus:ring-transparent focus:ring-offset-transparent',
      rounded: 'rounded-none',
      label: 'text-base sm:text-lg font-medium text-gray-200 dark:text-gray-200',
    },
    radio: {
      container: defaults.height,
      base: defaults.size,
    },
    notifications: {
      position: 'top-0 bottom-auto',
    },
    breadcrumb: {
      wrapper: 'mb-8',
      divider: 'i-heroicons-chevron-right',
    },
    tooltip: {
      wrapper: 'relative inline-flex',
      container: 'z-20 group',
      width: 'w-auto max-w-full',
      background: 'bg-white dark:bg-gray-900',
      color: 'text-gray-900 dark:text-white',
      shadow: 'shadow',
      rounded: 'rounded',
      ring: 'ring-1 ring-gray-200 dark:ring-gray-800',
      base: '[@media(pointer:coarse)]:hidden h-auto px-2 py-1 text-xs font-normal relative whitespace-normal', // Add 'whitespace-normal' for text wrapping
      shortcuts: 'hidden md:inline-flex flex-shrink-0 gap-0.5',
      middot: 'mx-1 text-gray-700 dark:text-gray-200',
      transition: {
        enterActiveClass: 'transition ease-out duration-200',
        enterFromClass: 'opacity-0 translate-y-1',
        enterToClass: 'opacity-100 translate-y-0',
        leaveActiveClass: 'transition ease-in duration-150',
        leaveFromClass: 'opacity-100 translate-y-0',
        leaveToClass: 'opacity-0 translate-y-1',
      },
      popper: {
        strategy: 'fixed',
      },
      default: {
        openDelay: 0,
        closeDelay: 0,
      },
      arrow: {
        base: '[@media(pointer:coarse)]:hidden invisible before:visible before:block before:rotate-45 before:z-[-1] before:w-2 before:h-2',
        ring: 'before:ring-1 before:ring-gray-200 dark:before:ring-gray-800',
        rounded: 'before:rounded-sm',
        background: 'before:bg-gray-200 dark:before:bg-gray-800',
        shadow: 'before:shadow',
        placement: 'group-data-[popper-placement*=\'right\']:-left-1 group-data-[popper-placement*=\'left\']:-right-1 group-data-[popper-placement*=\'top\']:-bottom-1 group-data-[popper-placement*=\'bottom\']:-top-1',
      },
    },
    range: {
      wrapper: 'relative w-full flex items-center',
      base: 'w-full absolute appearance-none cursor-pointer disabled:cursor-not-allowed disabled:bg-opacity-50 focus:outline-none peer group',
      rounded: 'rounded-none',
      background: 'bg-transparent',
      ring: 'focus-visible:ring-2 focus-visible:ring-{color}-500 dark:focus-visible:ring-{color}-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900',
      progress: {
        base: 'absolute pointer-events-none peer-disabled:bg-opacity-50',
        rounded: 'rounded-s-lg',
        background: 'bg-{color}-500 dark:bg-{color}-400',
        size: {
          '2xs': 'h-px',
          'xs': 'h-0.5',
          'sm': 'h-1',
          'md': 'h-2',
          'lg': 'h-3',
          'xl': 'h-4',
          '2xl': 'h-5',
        },
      },
      thumb: {
        base: '[&::-webkit-slider-thumb]:relative [&::-moz-range-thumb]:relative [&::-webkit-slider-thumb]:z-[1] [&::-moz-range-thumb]:z-[1] [&::-webkit-slider-thumb]:appearance-none [&::-moz-range-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0',
        color: 'text-{color}-500 dark:text-{color}-400',
        background: '[&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:dark:bg-gray-900 [&::-moz-range-thumb]:bg-current [&::-webkit-slider-thumb:hover]:bg-topaz-900 [&::-moz-range-thumb:hover]:bg-topaz-900 ',
        ring: '[&::-webkit-slider-thumb]:ring-2 [&::-webkit-slider-thumb]:ring-current',
        size: {
          '2xs': '[&::-webkit-slider-thumb]:h-1.5 [&::-moz-range-thumb]:h-1.5 [&::-webkit-slider-thumb]:w-1.5 [&::-moz-range-thumb]:w-1.5 [&::-webkit-slider-thumb]:mt-[-2.5px] [&::-moz-range-thumb]:mt-[-2.5px]',
          'xs': '[&::-webkit-slider-thumb]:h-2 [&::-moz-range-thumb]:h-2 [&::-webkit-slider-thumb]:w-2 [&::-moz-range-thumb]:w-2 [&::-webkit-slider-thumb]:mt-[-3px] [&::-moz-range-thumb]:mt-[-3px]',
          'sm': '[&::-webkit-slider-thumb]:h-3 [&::-moz-range-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-moz-range-thumb]:w-3 [&::-webkit-slider-thumb]:-mt-1 [&::-moz-range-thumb]:-mt-1',
          'md': '[&::-webkit-slider-thumb]:h-6 [&::-moz-range-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-moz-range-thumb]:w-6 [&::-webkit-slider-thumb]:-mt-2 [&::-moz-range-thumb]:-mt-2',
          'lg': '[&::-webkit-slider-thumb]:h-5 [&::-moz-range-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-moz-range-thumb]:w-5 [&::-webkit-slider-thumb]:-mt-1 [&::-moz-range-thumb]:-mt-1',
          'xl': '[&::-webkit-slider-thumb]:h-6 [&::-moz-range-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-moz-range-thumb]:w-6 [&::-webkit-slider-thumb]:-mt-1 [&::-moz-range-thumb]:-mt-1',
          '2xl': '[&::-webkit-slider-thumb]:h-7 [&::-moz-range-thumb]:h-7 [&::-webkit-slider-thumb]:w-7 [&::-moz-range-thumb]:w-7 [&::-webkit-slider-thumb]:-mt-1 [&::-moz-range-thumb]:-mt-1',
        },
      },
      track: {
        base: '[&::-webkit-slider-runnable-track]:group-disabled:bg-opacity-50 [&::-moz-range-track]:group-disabled:bg-opacity-50',
        background: '[&::-webkit-slider-runnable-track]:bg-gray-200 [&::-moz-range-track]:bg-gray-200 [&::-webkit-slider-runnable-track]:dark:bg-gray-700 [&::-moz-range-track]:dark:bg-gray-700',
        rounded: '[&::-webkit-slider-runnable-track]:rounded-none [&::-moz-range-track]:rounded-none',
        size: {
          '2xs': '[&::-webkit-slider-runnable-track]:h-px [&::-moz-range-track]:h-px',
          'xs': '[&::-webkit-slider-runnable-track]:h-0.5 [&::-moz-range-track]:h-0.5',
          'sm': '[&::-webkit-slider-runnable-track]:h-1 [&::-moz-range-track]:h-1',
          'md': '[&::-webkit-slider-runnable-track]:h-2 [&::-moz-range-track]:h-2',
          'lg': '[&::-webkit-slider-runnable-track]:h-3 [&::-moz-range-track]:h-3',
          'xl': '[&::-webkit-slider-runnable-track]:h-4 [&::-moz-range-track]:h-4',
          '2xl': '[&::-webkit-slider-runnable-track]:h-5 [&::-moz-range-track]:h-5',
        },
      },
      size: {
        '2xs': 'h-1.5',
        'xs': 'h-2',
        'sm': 'h-3',
        'md': 'h-4',
        'lg': 'h-5',
        'xl': 'h-6',
        '2xl': 'h-7',
      },
      default: {
        size: 'md',
        color: 'primary',
      },
    },
  },
})

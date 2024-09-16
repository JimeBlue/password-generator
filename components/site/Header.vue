<template>
  <header class="sticky top-0 z-40 flex w-full flex-col justify-center border-b bg-white">
    <div class="container flex h-20 w-full items-center">
      <div class="flex flex-1 items-center gap-x-6 lg:justify-between lg:gap-x-16">
        <!-- NOTE: logo -->
        <NuxtLink :to="localePath(root)" class="flex">
          <img src="/img/logo-no-background.png" alt="JimeBlue" class="w-28">
        </NuxtLink>

        <!-- NOTE: container for language switcher and mobile menu button -->
        <div class="ml-auto flex items-center gap-x-2 lg:ml-0">
          <!-- language switcher with 2 UButton -->
          <div class="flex gap-1">
            <UButton
              v-for="(l, index) in locales"
              :key="l.code"
              color="lightBlue"
              variant="ghost"
              size="sm"
              :class="{ 'bg-blue-100': l.code === locale }"
              @click="switchLocale(index)"
            >
              <UIcon
                :name="l.code === 'en' ? 'i-circle-flags:en' : 'i-circle-flags:de'"
                class="size-5"
              />
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
const root = '/'
const localePath = useLocalePath()
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

function switchLocale(index) {
  const selectedLocale = locales.value[index].code
  const newLocalePath = switchLocalePath(selectedLocale)

  const router = useRouter()
  router.push(newLocalePath)
}
</script>

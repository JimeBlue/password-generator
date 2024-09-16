<template>
  <section class="py-10">
    <div class="container">
      <h1 class="text-2xl font-bold text-brand-500">
        {{ $t('welcome.title') }}
      </h1>
      <UForm
        class="space-y-4"
      >
        <UFormGroup label="Character Length" name="passwordLength">
          <URange />
        </UFormGroup>

        <UFormGroup label="Include Uppercase Letters" name="includeUppercase">
          <UCheckbox />
        </UFormGroup>

        <UFormGroup label="Include Lowercase Letters" name="includeLowercase">
          <UCheckbox />
        </UFormGroup>

        <UFormGroup label="Include Numbers" name="includeNumbers">
          <UCheckbox />
        </UFormGroup>

        <UFormGroup label="Include Symbols" name="includeSymbols">
          <UCheckbox />
        </UFormGroup>

        <UButton type="submit">
          Generate
        </UButton>
      </UForm>
    </div>
  </section>
</template>

<script setup>

</script>

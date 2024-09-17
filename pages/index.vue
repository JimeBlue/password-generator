<template>
  <section class="py-10">
    <div class="container">
      <h1 class="text-2xl font-bold text-brand-500">
        {{ $t('welcome.title') }}
      </h1>
      <UForm
        ref="formRef"
        :state="form"
        :validate="validate"
        autocomplete="off"
        @submit="onSubmit"
        @error="onError"
      >
        <!-- Character length slider -->
        <UFormGroup label="Character Length" name="passwordLength">
          <URange v-model="form.passwordLength" :min="8" :max="20" />
        </UFormGroup>

        <!-- Checkboxes for character type inclusion -->
        <UFormGroup label="Include Uppercase Letters" name="includeUppercase">
          <UCheckbox v-model="form.includeUppercase" />
        </UFormGroup>

        <UFormGroup label="Include Lowercase Letters" name="includeLowercase">
          <UCheckbox v-model="form.includeLowercase" />
        </UFormGroup>

        <UFormGroup label="Include Numbers" name="includeNumbers">
          <UCheckbox v-model="form.includeNumbers" />
        </UFormGroup>

        <UFormGroup label="Include Symbols" name="includeSymbols">
          <UCheckbox v-model="form.includeSymbols" />
        </UFormGroup>

        <!-- Submit button -->
        <UButton type="submit">
          Generate
        </UButton>
      </UForm>
    </div>
  </section>
</template>

<script setup>
import { z } from 'zod'

// Form state object
const form = ref({
  passwordLength: 12,
  includeUppercase: true,
  includeLowercase: true,
  includeNumbers: true,
  includeSymbols: false,
})

// Zod schema for basic validation
const zodSchema = z.object({
  passwordLength: z.number().min(8, 'Password must be at least 8 characters').max(20, 'Password cannot exceed 20 characters'),
  includeUppercase: z.boolean(),
  includeLowercase: z.boolean(),
  includeNumbers: z.boolean(),
  includeSymbols: z.boolean(),
})

// Custom validation logic
function validate(state) {
  const errors = []

  // Validate with Zod
  const result = zodSchema.safeParse(state)

  if (!result.success) {
    result.error.errors.forEach((error) => {
      errors.push({
        path: error.path.join('.'),
        message: error.message,
      })
    })
  }

  // Additional custom validation: ensure at least one checkbox is selected
  if (!state.includeUppercase && !state.includeLowercase && !state.includeNumbers && !state.includeSymbols) {
    errors.push({
      path: 'includeUppercase', // Could be any checkbox path
      message: 'At least one character type must be selected',
    })
  }

  return errors
}

// Form submit handler (doesn't need to submit to backend)
async function onSubmit(event) {
  console.log(event.data)
}

// Error handler
async function onError(event) {
  console.log(event.errors)
}
</script>

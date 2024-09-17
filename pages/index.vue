<template>
  <section class="py-10">
    <div class="container">
      <h1 class="text-2xl font-bold text-brand-500">
        {{ $t('welcome.title') }}
      </h1>
      <UForm
        :state="form"
        :validate="validate"
        autocomplete="off"
        @submit="onSubmit"
        @error="onError"
      >
        <!-- Character length label and value -->
        <div class="mb-2 flex justify-between">
          <span>Character Length</span>
          <span>{{ form.passwordLength }}</span>
        </div>
        <!-- Character length slider -->
        <UFormGroup name="passwordLength">
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

        <UButton type="submit">
          Generate
        </UButton>

        <div v-if="generatedPassword" class="mt-4">
          <h2 class="text-lg font-bold">
            Generated Password:
          </h2>
          <p class="font-mono text-brand-500">
            {{ generatedPassword }}
          </p>
        </div>
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

// Store the generated password
const generatedPassword = ref('')

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

// Function to generate the password
function generatePassword() {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lowercase = 'abcdefghijklmnopqrstuvwxyz'
  const numbers = '0123456789'
  const symbols = '!@#$%^&*()_+[]{}|;:,.<>?'

  let availableCharacters = ''
  if (form.value.includeUppercase) { availableCharacters += uppercase }
  if (form.value.includeLowercase) { availableCharacters += lowercase }
  if (form.value.includeNumbers) { availableCharacters += numbers }
  if (form.value.includeSymbols) { availableCharacters += symbols }

  // Ensure there are available characters based on selected options
  if (availableCharacters === '') {
    generatedPassword.value = 'Please select at least one option'
    return
  }

  let password = ''
  for (let i = 0; i < form.value.passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * availableCharacters.length)
    password += availableCharacters[randomIndex]
  }

  generatedPassword.value = password
}

// Form submit handler (trigger password generation)
async function onSubmit(event) {
  const errors = validate(form.value)

  if (errors.length === 0) {
    generatePassword()
  }
  else {
    console.log('Validation errors:', errors)
  }
}

// Error handler
async function onError(event) {
  console.log(event.errors)
}
</script>

<template>
    <v-container class="fill-height align-center justify-center">
        <v-row class="fill-height" align="center" justify="center">
            <v-col
                cols="12"
                sm="8"
                md="6"
                lg="4"
            >
                <v-card>
                    <v-card-title class="primary white--text">
                        <div class="display-1">Авторизация</div>
                    </v-card-title>

                    <v-divider />

                    <template v-if="response == RES.NONE">
                        <v-card-text>
                            <v-alert
                                v-if="error"
                                type="error"
                                dense
                                outlined
                            >
                                {{ error }}
                            </v-alert>

                            <v-text-field
                                v-model="email"
                                label="Email"
                                prepend-icon="mdi-account-circle"
                                :error-messages="emailErrors"
                                @blur="$v.email.$touch()"
                            />

                            <v-text-field
                                v-model="password"
                                label="Пароль"
                                :type="showPassword ? 'text' : 'password'"
                                prepend-icon="mdi-lock"
                                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                @click:append="showPassword = !showPassword"
                                :error-messages="passwordErrors"
                                @blur="$v.password.$touch()"
                            />
                        </v-card-text>

                        <v-divider />

                        <v-card-actions>
                            <v-spacer />
                            <v-btn
                                color="success"
                                @click="submit"
                                :loading="loading"
                            >
                                Вход
                            </v-btn>
                        </v-card-actions>
                    </template>
                    <template v-else>
                        <v-card-text>
                            <v-alert v-if="response == RES.OK" type="success">Вы успешно авторизовались!</v-alert>
                            <v-alert v-else-if="response == RES.ERROR" type="error">Ошибка авторизации.</v-alert>
                        </v-card-text>
                    </template>
                </v-card>

            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

export default {
    layout: 'empty',
    data()
    {
        return {
            error: '',
            loading: false,
            RES:
            {
                NONE: 0,
                OK: 1,
                ERROR: 2
            },
            response: 0,
            showPassword: false,
            email: '',
            password: ''
        }
    },
    head()
    {
        return {
            title: 'Вход в админку'
        }
    },
    validations:
    {
        email: { required, email },
        password: { required }
    },
    computed:
    {
        emailErrors()
        {
            const errors = []
            if (!this.$v.email.$dirty) return errors

            !this.$v.email.required && errors.push('Незаполненное поле!')
            !this.$v.email.email && errors.push('Email невалидный.')

            return errors
        },
        passwordErrors()
        {
            const errors = []
            if (!this.$v.password.$dirty) return errors

            !this.$v.password.required && errors.push('Незаполненное поле!')

            return errors
        }
    },
    methods:
    {
        async submit()
        {
            this.error = ''

            this.$v.$touch()
            if (this.$v.$invalid) return

            this.loading = true

            try
            {
                let res = await this.$auth.loginWith('local',
                {
                    data:
                    {
                        email: this.email,
                        password: this.password
                    }
                })
            }
            catch (error)
            {
                this.error = error.response.data[0].message
            }

            this.loading = false
        }
    }
}
</script>

<style scoped>

</style>
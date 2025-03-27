
const { test, expect } = require('../support/index')

test('Deve logar como administrador', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', 'pwd123')
    await page.movies.isLoggedIn()
})


test('Não deve logar com senha incorreta', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', 'pwd124')

    const message = "Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente."

    await page.toast.containText(message)
})

test('Não deve logar quando o email é inválido', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('keila.com.br', 'pwd124')
    await page.login.alertHaveText('Email incorreto')
})


test('Não deve logar quando o email não é preenchido', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('', 'pwd124')
    await page.login.alertHaveText('Campo obrigatório')
})


test('Não deve logar quando a senha não é preenchida', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('keilasilva@gmail.com', '')
    await page.login.alertHaveText('Campo obrigatório')
})


test('Não deve logar quando nenhum campo é preenchido', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('', '')
    await page.login.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])
})


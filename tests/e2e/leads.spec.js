
import { test, expect } from '../support/index';
const { faker } = require('@faker-js/faker');

// const { LandingPage } = require('../pages/LandingPage')
// const { Toast } = require('../pages/Components')


// let landingPage
// let toast


// test.beforeEach(async ({ page }) => {
//   landingPage = new LandingPage(page)
//   toast = new Toast(page)
// })


test('Deve cadastrar um lead na fila de espera', async ({ page }) => {
  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm(leadName, leadEmail)

  const message = "Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!"
  await page.toast.containText(message)

});


test('Não deve cadastrar quando o email já existe', async ({ page, request }) => {

  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

  const newLead = await request.post('http://localhost:3333/leads', {
    data: {
      name: leadName,
      email: leadEmail
    }
  })

  expect(newLead.ok()).toBeTruthy()

  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm(leadName, leadEmail)


  const message = "O endereço de e-mail fornecido já está registrado em nossa fila de espera."
  await page.toast.containText(message)

});



test('não deve cadastrar com email imcorreto', async ({ page }) => {
  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('Keila Santos', 'keilabinelly.com.br')
  await page.landing.alertHaveText('Email incorreto')


});


test('não deve cadastrar quando o nome não é preemchido', async ({ page }) => {
  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('', 'keilabinelly@gmail.com')
  await page.landing.alertHaveText('Campo obrigatório')


});


test('não deve cadastrar quando o email não é preemchido', async ({ page }) => {
  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('Keila Santos', '')
  await page.landing.alertHaveText('Campo obrigatório')


});


test('não deve cadastrar quando nenhum campo é preenchido', async ({ page }) => {
  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('', '')
  await page.landing.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório'
  ])

});

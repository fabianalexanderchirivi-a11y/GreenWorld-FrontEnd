import { credentials } from '../../support/ppi'

describe('TC-GW03-02 — Rechazar credenciales incorrectas', () => {
  it('rechaza una contraseña incorrecta de una cuenta existente', () => {
    credentials().then(({ correo, contrasena }) => {
      cy.intercept('POST', '/api/auth/login').as('login')
      cy.visit('/login', {
        onBeforeLoad(window) {
          window.localStorage.clear()
          window.sessionStorage.clear()
        },
      })

      cy.get('#email').type(correo, { log: false })
      cy.get('#password').type(`${contrasena}-incorrecta`, { log: false })
      cy.contains('button[type="submit"]', 'Iniciar sesión').click()

      cy.wait('@login').then(({ response }) => {
        expect(response.statusCode).to.eq(401)
        expect(response.body.success).to.eq(false)
      })
      cy.get('.login-error').should('contain.text', 'Correo o contrasena incorrectos')
      cy.location('pathname').should('eq', '/login')
      cy.window().then((window) => {
        expect(window.sessionStorage.getItem('token')).to.be.null
        expect(window.localStorage.getItem('token')).to.be.null
      })
      cy.screenshot('TC-GW03-02-credenciales-incorrectas')
    })
  })
})

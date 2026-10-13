import { credentials } from '../../support/ppi'

describe('TC-GW03-01 — Inicio de sesión válido', () => {
  it('envía el formulario real y abre el panel del usuario autenticado', () => {
    credentials().then(({ correo, contrasena }) => {
      cy.intercept('POST', '/api/auth/login').as('login')
      cy.visit('/login', {
        onBeforeLoad(window) {
          window.localStorage.clear()
          window.sessionStorage.clear()
        },
      })
      cy.get('#email').type(correo, { log: false })
      cy.get('#password').type(contrasena, { log: false })
      cy.contains('button[type="submit"]', 'Iniciar sesión').click()

      cy.wait('@login').then(({ response }) => {
        expect(response.statusCode).to.eq(200)
        expect(response.body.token).to.be.a('string').and.not.be.empty
        expect(response.body.usuario).to.be.an('object')
        const destination = response.body.usuario.rol === 'admin' ? '/admin' : '/panel-usuario'
        cy.location('pathname').should('eq', destination)
      })

      cy.window().then((window) => {
        expect(window.sessionStorage.getItem('token')).to.be.a('string').and.not.be.empty
        expect(JSON.parse(window.sessionStorage.getItem('usuario')).correo).to.eq(correo)
      })
      cy.get('h1').should('be.visible')
      cy.screenshot('TC-GW03-01-login')
    })
  })
})

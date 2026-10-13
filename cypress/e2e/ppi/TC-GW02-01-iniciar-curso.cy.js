import { availableCourse, loginByApi, visitWithSession } from '../../support/ppi'

describe('TC-GW02-01 — Iniciar un curso disponible', () => {
  let startedId
  let token

  afterEach(() => {
    if (startedId && token) {
      cy.request({
        method: 'PUT',
        url: `/api/cursos/${startedId}/cancelar`,
        headers: { Authorization: `Bearer ${token}` },
        failOnStatusCode: false,
      }).then(({ status }) => expect(status).to.eq(200))
    }
  })

  it('inicia desde la interfaz un curso descubierto en la API real', () => {
    loginByApi().then((session) => {
      token = session.token

      availableCourse(token).then(({ id, title }) => {
        cy.intercept('GET', '/api/courses').as('courses')
        cy.intercept('GET', '/api/usuarios/me/cursos').as('myCourses')
        cy.intercept('POST', `/api/cursos/${id}/iniciar`).as('start')

        visitWithSession(`/cursos/${id}`, session)
        cy.wait('@courses').its('response.statusCode').should('eq', 200)
        cy.wait('@myCourses').its('response.statusCode').should('eq', 200)
        cy.contains('h1', title).should('be.visible')
        cy.contains('button', 'Comenzar').click()

        cy.wait('@start').then(({ response }) => {
          expect(response.statusCode).to.eq(200)
          expect(response.body.data.estado_progreso).to.eq('en_progreso')
          startedId = id
        })
        cy.get('.course-state-pill').should('contain.text', 'En progreso')
        cy.contains('button', 'Terminar curso').should('be.visible')
        cy.screenshot('TC-GW02-01-iniciar-curso')
      })
    })
  })
})

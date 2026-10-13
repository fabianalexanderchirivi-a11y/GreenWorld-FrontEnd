export const credentials = () => (
  cy.env(['USER_EMAIL', 'USER_PASSWORD'], { log: false })
    .then(({ USER_EMAIL: correo, USER_PASSWORD: contrasena }) => {
      if (!correo || !contrasena) {
        throw new Error('Configura CYPRESS_USER_EMAIL y CYPRESS_USER_PASSWORD con una cuenta de prueba de Green World.')
      }

      return { correo, contrasena }
    })
)

export const loginByApi = () => (
  credentials().then(({ correo, contrasena }) => (
    cy.request({
      method: 'POST',
      url: '/api/auth/login',
      body: { correo, contrasena },
      log: false,
    }).then(({ status, body }) => {
      expect(status).to.eq(200)
      expect(body.token).to.be.a('string').and.not.be.empty
      expect(body.usuario).to.be.an('object')
      return { token: body.token, usuario: body.usuario }
    })
  ))
)

export const visitWithSession = (path, { token, usuario }) => {
  cy.visit(path, {
    onBeforeLoad(window) {
      window.localStorage.clear()
      window.sessionStorage.clear()
      window.sessionStorage.setItem('token', token)
      window.sessionStorage.setItem('usuario', JSON.stringify(usuario))
    },
  })
}

export const availableCourse = (token) => (
  cy.request('GET', '/api/courses').then(({ status, body }) => {
    expect(status).to.eq(200)
    expect(body.data).to.be.an('array')

    return cy.request({
      method: 'GET',
      url: '/api/usuarios/me/cursos',
      headers: { Authorization: `Bearer ${token}` },
    }).then(({ status: myStatus, body: myBody }) => {
      expect(myStatus).to.eq(200)
      expect(myBody.data).to.be.an('array')

      const enrolledIds = new Set(myBody.data.map((course) => String(course.id_curso)))
      const course = body.data.find((item) => {
        const id = item.id_curso ?? item.id
        return Number.isInteger(Number(id)) && Number(id) > 0 && !enrolledIds.has(String(id))
      })

      if (!course) {
        throw new Error('La cuenta de prueba no tiene cursos publicados sin iniciar. Prepara un curso disponible o reinicia sus inscripciones de prueba.')
      }

      return { id: course.id_curso ?? course.id, title: course.titulo ?? course.name }
    })
  })
)

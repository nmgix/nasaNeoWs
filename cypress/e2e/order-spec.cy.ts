import "cypress-localstorage-commands";

describe("Проверка заказа", () => {
  before(() => {
    cy.viewport(1280, 720);
    cy.visit("/");
  });

  it("Добавление элемента в заказ сохраняет его в localStorage", () => {
    cy.get('[class*="styles_asteroidsGrid"]')
      .children()
      .eq(0)
      .then((elem) => {
        cy.wrap(elem).within(() => {
          let id = "";
          cy.get("span")
            .eq(0)
            .then((el) => (id = el.text()));
          cy.get("button")
            .contains("Уничтожить")
            .click()
            .then(() => {
              cy.getLocalStorage("asteroid-order").then((value) => {
                expect(JSON.parse(value!)[0]).to.equal(id.toString());
              });
            });
        });
      });
  });

  it("Удаление элемента из списка и отправка бригады", () => {
    cy.get('[class*="styles_asteroidsGrid"]')
      .children()
      .eq(1)
      .then((elem) => {
        cy.wrap(elem).within(() => {
          cy.get("button").contains("Уничтожить").click();
        });
      });
    cy.get('[class*="styles_asteroidsGrid"]')
      .children()
      .eq(2)
      .then((elem) => {
        cy.wrap(elem).within(() => {
          cy.get("button").contains("Уничтожить").click();
        });
      });

    cy.visit("/order");

    cy.get('[class*="styles_asteroidsGrid"]').children().should("have.length", 3);

    cy.get('[class*="styles_asteroidsGrid"]')
      .children()
      .eq(1)
      .then((elem) =>
        cy.wrap(elem).within(() => {
          cy.get("button").contains("Удалить из заказа").click();
        })
      );
    cy.get('[class*="styles_asteroidsGrid"]').children().should("have.length", 2);

    cy.get("button")
      .contains("Отправить бригаду им. Брюса Уиллиса")
      .click()
      .then(() => {
        cy.saveLocalStorage();
        cy.wait(3000);
        cy.getLocalStorage("asteroid-order").then((value) => {
          expect(JSON.parse(value!)).to.eql([]);
        });
      });
  });
});

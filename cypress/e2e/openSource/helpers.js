// To Select Server Name
export function decideServerName()
{
   return 'Test'
}

// To Select Server URL
export function decideServerURL(Server)
{
    if(Server == 'Local' || Server == 'local' || Server  ==  'LOCAL')
    {
        return 'htcvhb001.local'
    }else if(Server == 'Test' || Server == 'test' || Server == 'TEST')
    {
        return 'healthtech-test'
    }else if(Server == 'Staging' || Server == 'staging' || Server == 'STAGING')
    {
        return 'healthtech-staging'
    }
}

// To get iFrame to chain further Commands
export function getIframe(path) {
    // get the iframe > document > body
    // and retry until the body element is not empty
    return cy.get(path)
      .its('0.contentDocument.body')
      .should('not.be.empty')
      // wraps "body" DOM element to allow
      // chaining more Cypress commands, like ".find(...)"
      .then(cy.wrap)
}

// To Verify file is actually added
export function verifyFileAdded(path, fileText)   {
    cy.get(path).should('have.text', fileText)
}
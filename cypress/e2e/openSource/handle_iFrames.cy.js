/// <reference types="cypress" />

import 'cypress-file-upload';

import {
    decideServerName,
    decideServerURL,
    getIframe, 
    verifyFileAdded
} from "./helpers"

describe('Handle iFrames in Cypress', () => {

    const serverURL = decideServerURL(decideServerName())
    before(() => {
        cy.intercept(`https://${serverURL}.healthtech.net/login`).as('loginPage') // Using Alias
        cy.visit(`https://${serverURL}.healthtech.net/login`)
        cy.wait('@loginPage') // Implicit Waiting
        // Correct username Correct password
        cy.fixture('credentials').then((loginCredentials) =>
        { 
            // Do Login using loginCredentials from fixture file
            cy.get('input[name="username"]').typeSecurely(loginCredentials.correctName)     
            cy.get('input[name="password"]').typeSecurely(loginCredentials.correctPassword)  
        })
    })

    /* This "Upload Files - Using Different Approaches" context explores three methods of adding files within iframes. These methods include directly accessing elements, using helpers for streamlined interactions, and utilizing custom commands for enhanced readability and reusability. Each approach demonstrates distinct strategies for handling iframe interactions and file attachments in Cypress tests */
    
    context('Upload Files - Using Different Approaches', () => {

        before(() => {
            /* Navigate to the page or section containing iframes where interactions are required and perform assertions to verify you're actually there */
        })

        it('Add Files - Directly Accessing Elements', () => {
            // To Wrap wcElement to enable file upload afterward
            const welcomePacket = cy.get('div[field="welcome_packet_attachment"] div.controls iFrame[name="ffileupload"]')
                .its('0.contentDocument.body')
                .should('be.visible').and('not.be.empty').then(cy.wrap)
            // To Add Welcome Packet File 
            welcomePacket.find('input').attachFile('wcFile.png')
            // To Verify Welcome Packet File is actually added
            cy.get('div[field="welcome_packet_attachment"] div.controls span:last a')
                .should('have.text', 'wcFile.png')
            // To Wrap spdElement to enable file upload afterward
            const SPD = cy.get('div[field="spd_attachment"] div.controls iFrame[name="ffileupload"]')
                .its('0.contentDocument.body')
                .should('be.visible').and('not.be.empty').then(cy.wrap)
            // To Add SPD Attachment File
            SPD.find('input').attachFile('spdFile.png')
            // To Verify SPD Attachment File is actually added
            cy.get('div[field="spd_attachment"] div.controls span:last a').should('have.text', 'spdFile.png')
        })
    
        it('Add Files - Using Helpers', () => {
            // To Add Welcome Packet File
            getIframe('div[field="welcome_packet_attachment"] div.controls iFrame[name="ffileupload"]')
                .find('input').attachFile('wcFile.png')
            // To Verify Welcome Packet File is actually added
            verifyFileAdded('div[field="welcome_packet_attachment"] div.controls span:last a', 'wcFile.png')
            // To Add SPD Attachment File
            getIframe('div[field="welcome_packet_attachment"] div.controls iFrame[name="ffileupload"]')
                .find('input').attachFile('spdFile.png')
            // To Verify SPD Attachment File is actually added
            verifyFileAdded('div[field="welcome_packet_attachment"] div.controls span:last a', 'spdFile.png')
        })
    
        it('Add Files - Using customCommands', () => {
            // To Add Welcome Packet File
            cy.getIframeBody('div[field="welcome_packet_attachment"] div.controls iFrame[name="ffileupload"]')
                .find('input').attachFile('wcFile.png')
            // To Verify Welcome Packet File is actually added
            cy.verifyFileAdded('div[field="welcome_packet_attachment"] div.controls span:last a', 'wcFile.png')
            // To Add SPD Attachment File
            cy.getIframeBody('div[field="spd_attachment"] div.controls iFrame[name="ffileupload"]')
                .find('input').attachFile('spdFile.png')
            // To Verify SPD Attachment File is actually added
            cy.verifyFileAdded('div[field="welcome_packet_attachment"] div.controls span:last a', 'spdFile.png')
        })
    })

    after(() => {
        // Do logout or anyother task according to your needs
    }) // End after Hook

}) // End Describe Block
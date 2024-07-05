import React from 'react';
import {
  CollapsibleComponent,
  CollapsibleHead,
  CollapsibleContent
} from "react-collapsible-component";
import "./style.module.css";



function Portfolio() {
  return (
    <div className="expBorder">
      <CollapsibleComponent className="additionalClassForCollapsible ">
          <CollapsibleHead className="additionalClassForHead " >
            Senior Frontend developer, Cox Auto Inc.
            (Mobility and Fleet operations),Remote
            Altanta, GA
          </CollapsibleHead>
            <CollapsibleContent className="additionalClassForContent " >
              <p>
              Cox Automotive Mobility specialized in comprehensive fleet services
              and operations. They provide a SaaS solution for the customers to
              keep fleets moving safely and sustainably for the next generation.
              Maximize fleet uptime with the premier partner in maintenance
              service. Manage scheduled and emergency maintenance. The project is
              to develop interface for the customers to manage vehicles
              information, schedule preventative maintenance, define automated
              service schedule, generate report and analytics etc.
              </p>
            </CollapsibleContent>
          <CollapsibleHead className="additionalClassForHead " >
            Senior React developer, StateFarm, Remote
          </CollapsibleHead>
            <CollapsibleContent className="additionalClassForContent " >
              <p>
              AQP (Auto Quote purchase) is automatic quotation 
              management platform from statefarm, enabling its 
              user to explore, prepare, submit, negotiate 
              and purchase different insurance product, 
              like Auto Insurance, Home Insurance, Medical 
              insurance etc. Front-end developed in React JS, 
              some user faced pages are written in plain JSP 
              and backend apis are developed with Spring based framework.
              </p>
            </CollapsibleContent>
          <CollapsibleHead className="additionalClassForHead " >
            Senior UI developer, Fidelity Investments, Durham, Nc
          </CollapsibleHead>
            <CollapsibleContent className="additionalClassForContent " >
              <p>
              Working on react js based web applications 
              providing user interface for different 
              functionalities like PI-Login Experience, 
              2FA, Security center, DAE, NUR - related to the 
              user security of Fid.com. Additionally, working on 
              Inactivity timeout and DBS (Delegated Brokerage Service) 
              enhancements that are part of Fid.com 
              and moving application on-premises to AWS.
              </p>
          </CollapsibleContent>
          <CollapsibleHead className="additionalClassForHead " >
            UI/React DEVELOPER, Ford- Dearborn, MI          
          </CollapsibleHead>
            <CollapsibleContent className="additionalClassForContent " >
              <p>
              SYNC is an integrated in-vehicle communications
               and entertainment system embedded in Ford and 
               Lincoln vehicles. SYNC handles all of the commands 
               sent from an App Link application and delivers the 
               intended message inside the vehicle. All UI including 
               commands, display requests, vehicle data authorization, 
               and responses are managed by the SYNC system on behalf of 
               the mobile application and 
              communicated over App Link.
              </p>
          </CollapsibleContent>
          <CollapsibleHead className="additionalClassForHead " >
            SR. UI/ React Developer, IBM, San Jose, CA
          </CollapsibleHead>
            <CollapsibleContent className="additionalClassForContent " >
              <p>
              The IBM Quantum Experience launched in May, 
              giving researchers, students, and enthusiasts 
              cloud-based access to an experimental quantum 
              computing platform. As computing moves beyond 
              the classic binary system, bits with infinite 
              positions will unlock infinite possibilities. 
              Platform users can learn quantum principles,
              experiment with new algorithms, and more.
              </p>
          </CollapsibleContent>
          <CollapsibleHead className="additionalClassForHead " >
            UI DEVELOPER, Bench Tech Software Pvt Ltd, Bengaluru, India
          </CollapsibleHead>
            <CollapsibleContent className="additionalClassForContent " >
              <p>
              Ben Tech offers full-service technology
               support from the switch to wire, wire to Wi-Fi, 
               server to desktop, cloud to the employee,
                employee to productivity. Benjamin Keith brings 
                20+ years of technical knowledge, professionalism, 
              and business experience to you.
              </p>
          </CollapsibleContent>
      </CollapsibleComponent>
            </div>
  );
}
export default Portfolio;
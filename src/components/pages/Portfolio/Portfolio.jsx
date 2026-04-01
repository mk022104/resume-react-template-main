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
      <h3 className="text-md mb-4 truncate md:ml-9 lg:ml-9 ml-1	uppercase font-medium text-gray-800 hover:text-indigo-400">
        Experience
      </h3>
      <CollapsibleComponent className="additionalClassForCollapsible ">
        <CollapsibleHead className="additionalClassForHead ">
          Senior UI developer,Pearson, Hybrid, NC
        </CollapsibleHead>
        <CollapsibleContent className="additionalClassForContent ">
          <p className="m-4">
            Centralized login: Customizable application developed using React
            based on Partner need. 1. Certiport. 2. Compass local 3. Certiport
            cloud Scheduler. 4. Certiport cloud Candidate. AMXUI: ForgeRock.
            Access Management &SSO: Enables secure single sign on, multi factor
            & password less authentication. Single Sign in: We been implemented
            Sign in with code authenticated the user using Email and SMS. Once
            it authenticated one of those asking the user MFA to add next level
            of authentication based on Partner (REVIBE, KIBO, HK LONGMAN).
            Progressive Profile: Allow the user to add Mobile number after the
            registration. We are allowing most of the countries. Once it gets
            verified get the success. Users enter 5 times wrong OTP will get
            error screen. User can skip mobile screen won’t need it we can see
            only 7days after cannot see the mobile screen. Then it will navigate
            to user Profile Screen.
          </p>
        </CollapsibleContent>
        <CollapsibleHead className="additionalClassForHead ">
          Senior Frontend developer, Cox Auto Inc. (Mobility and Fleet
          operations),Remote Altanta, GA
        </CollapsibleHead>
        <CollapsibleContent className="additionalClassForContent ">
          <p className="m-4">
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
        <CollapsibleHead className="additionalClassForHead ">
          Senior React developer, StateFarm, Remote
        </CollapsibleHead>
        <CollapsibleContent className="additionalClassForContent ">
          <p className="m-4">
            AQP (Auto Quote purchase) is automatic quotation management platform
            from statefarm, enabling its user to explore, prepare, submit,
            negotiate and purchase different insurance product, like Auto
            Insurance, Home Insurance, Medical insurance etc. Front-end
            developed in React JS, some user faced pages are written in plain
            JSP and backend apis are developed with Spring based framework.
          </p>
        </CollapsibleContent>
        <CollapsibleHead className="additionalClassForHead ">
          Senior UI developer, Fidelity Investments, Durham, Nc
        </CollapsibleHead>
        <CollapsibleContent className="additionalClassForContent ">
          <p className="m-4">
            Working on react js based web applications providing user interface
            for different functionalities like PI-Login Experience, 2FA,
            Security center, DAE, NUR - related to the user security of Fid.com.
            Additionally, working on Inactivity timeout and DBS (Delegated
            Brokerage Service) enhancements that are part of Fid.com and moving
            application on-premises to AWS.
          </p>
        </CollapsibleContent>
        <CollapsibleHead className="additionalClassForHead ">
          UI/React DEVELOPER, Ford- Dearborn, MI
        </CollapsibleHead>
        <CollapsibleContent className="additionalClassForContent ">
          <p className="m-4">
            SYNC is an integrated in-vehicle communications and entertainment
            system embedded in Ford and Lincoln vehicles. SYNC handles all of
            the commands sent from an App Link application and delivers the
            intended message inside the vehicle. All UI including commands,
            display requests, vehicle data authorization, and responses are
            managed by the SYNC system on behalf of the mobile application and
            communicated over App Link.
          </p>
        </CollapsibleContent>
        <CollapsibleHead className="additionalClassForHead ">
          SR. UI/ React Developer, IBM, San Jose, CA
        </CollapsibleHead>
        <CollapsibleContent className="additionalClassForContent ">
          <p className="m-4">
            The IBM Quantum Experience launched in May, giving researchers,
            students, and enthusiasts cloud-based access to an experimental
            quantum computing platform. As computing moves beyond the classic
            binary system, bits with infinite positions will unlock infinite
            possibilities. Platform users can learn quantum principles,
            experiment with new algorithms, and more.
          </p>
        </CollapsibleContent>
        <CollapsibleHead className="additionalClassForHead ">
          UI DEVELOPER, Bench Tech Software Pvt Ltd, Bengaluru, India
        </CollapsibleHead>
        <CollapsibleContent className="additionalClassForContent ">
          <p className="m-4">
            Ben Tech offers full-service technology support from the switch to
            wire, wire to Wi-Fi, server to desktop, cloud to the employee,
            employee to productivity. Benjamin Keith brings 20+ years of
            technical knowledge, professionalism, and business experience to
            you.
          </p>
        </CollapsibleContent>
      </CollapsibleComponent>
    </div>
  );
}
export default Portfolio;
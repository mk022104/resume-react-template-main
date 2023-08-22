import { Accordion, AccordionItem as Item } from "@szhsin/react-accordion";
import chevronDown from "./chevron-down.svg";
import styles from "../Portfolio/style.module.css";

const AccordionItem = ({ header, ...rest }) => (
  <Item
    {...rest}
    header={
      <>
        {header}
        <img className={styles.chevron} src={chevronDown} alt="Chevron Down" />
      </>
    }
    className={styles.item}
    buttonProps={{
      className: ({ isEnter }) =>
        `${styles.itemBtn} ${isEnter && styles.itemBtnExpanded}`,
    }}
    contentProps={{ className: styles.itemContent }}
    panelProps={{ className: styles.itemPanel }}
  />
);

export default function Portfolio() {
  return (
    <div>
      <div className="md:mx-8">
        <h3 className="text-8l font-bold text-gray-800 mb-2 hover:text-indigo-400">
          Experience
        </h3>
      </div>
      <div className={styles.accordion}>
        {/* `transitionTimeout` prop should be equal to the transition duration in CSS */}
        <Accordion transition transitionTimeout={250}>
          <AccordionItem
            header="Senior Frontend developer, Cox Auto Inc. (Mobility and Fleet operations),Remote"
            initialEntered
          >
            Cox Automotive Mobility specialized in comprehensive fleet services
            and operations. They provide a SaaS solution for the customers to
            keep fleets moving safely and sustainably for the next generation.
            Maximize fleet uptime with the premier partner in maintenance
            service. Manage scheduled and emergency maintenance. The project is
            to develop interface for the customers to manage vehicles
            information, schedule preventative maintenance, define automated
            service schedule, generate report and analytics etc.
          </AccordionItem>
          <AccordionItem header="Senior UI developer, Fidelity Investments, Durham, Nc">
            Working on react js based web applications providing user interface
            for different functionalities like PI-Login Experience, 2FA,
            Security center, DAE, NUR - related to the user security of Fid.com.
            Additionally, working on Inactivity timeout and DBS (Delegated
            Brokerage Service) enhancements that are part of Fid.com and moving
            application on-premises to AWS.
          </AccordionItem>
          <AccordionItem header="UI/React DEVELOPER, Ford- Dearborn, MI">
            SYNC is an integrated in-vehicle communications and entertainment
            system embedded in Ford and Lincoln vehicles. SYNC handles all of
            the commands sent from an App Link application and delivers the
            intended message inside the vehicle. All UI including commands,
            display requests, vehicle data authorization, and responses are
            managed by the SYNC system on behalf of the mobile application and
            communicated over App Link.
          </AccordionItem>
          <AccordionItem header="SR. UI/ React Developer, IBM, San Jose, CA">
            The IBM Quantum Experience launched in May, giving researchers,
            students, and enthusiasts cloud-based access to an experimental
            quantum computing platform. As computing moves beyond the classic
            binary system, bits with infinite positions will unlock infinite
            possibilities. Platform users can learn quantum principles,
            experiment with new algorithms, and more.
          </AccordionItem>
          <AccordionItem header="UI DEVELOPER, Bench Tech Software Pvt Ltd, Bengaluru, India">
            Ben Tech offers full-service technology support from the switch to
            wire, wire to Wi-Fi, server to desktop, cloud to the employee,
            employee to productivity. Benjamin Keith brings 20+ years of
            technical knowledge, professionalism, and business experience to
            you.
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

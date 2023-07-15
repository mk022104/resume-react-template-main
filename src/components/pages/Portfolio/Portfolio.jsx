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
        `${styles.itemBtn} ${isEnter && styles.itemBtnExpanded}`
    }}
    contentProps={{ className: styles.itemContent }}
    panelProps={{ className: styles.itemPanel }}
  />
);

export default function Portfolio() {
  return (
    <div>
      <div className={styles.accordion}>
        {/* `transitionTimeout` prop should be equal to the transition duration in CSS */}
        <Accordion transition transitionTimeout={250}>
          <AccordionItem header="Senior Frontend developer, Cox Auto Inc. (Mobility and Fleet operations)," initialEntered>
          Cox Automotive Mobility specialized in comprehensive fleet services and operations. They provide a SaaS solution for the customers to keep fleets moving safely and sustainably for the next generation. Maximize fleet uptime with the premier partner in maintenance service. Manage scheduled and emergency maintenance.
          The project is to develop interface for the customers to manage vehicles information, schedule preventative maintenance, define automated service schedule, generate report and analytics etc.
          </AccordionItem>
          <AccordionItem header="Senior React developer, Statefarm">
            Quisque eget luctus mi, vehicula mollis lorem. Proin fringilla vel
            erat quis sodales. Nam ex enim, eleifend venenatis lectus vitae.
          </AccordionItem>

          <AccordionItem header="Why do we use it?">
            Suspendisse massa risus, pretium id interdum in, dictum sit amet
            ante. Fusce vulputate purus sed tempus feugiat.
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

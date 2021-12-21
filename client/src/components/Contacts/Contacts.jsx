import React from 'react';
import styles from "./Contacts.module.css";

function Contacts() {
	return (
		<div className={styles.contacts}>
			<li>служба поддержки</li>
			<li><a href="tel:88002005990">8 800 200 59 90</a></li>
		</div>
	);
}

export default Contacts;

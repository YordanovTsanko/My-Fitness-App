import React from "react";

const Cv = () => {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.name}>Цанко Йорданов</h1>
        <p style={styles.contact}>
          Телефон: +359 899 597 920 | Имейл: <a href="mailto:faxyhitz1@gmail.com" style={styles.email}>faxyhitz1@gmail.com</a>
        </p>
        <p style={styles.contact}>Адрес: България, гр. Варна, Ул. Димитър Икономов 11</p>
      </header>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Професионален Профил</h2>
        <p style={styles.text}>
          Млад и мотивиран професионалист с опит в работа с клиенти и внимание към детайлите. След 4 години в Англия, където развих умения за 
          ефективна комуникация и бързо разрешаване на клиентски казуси, съм готов да приложа тези качества в сферата на финансовите консултации. 
          Притежавам умения за организираност, адаптивност и аналитично мислене, необходими за изграждане на доверие и предлагане на финансови 
          решения, които най-добре отговарят на нуждите на клиентите. Интересувам се от финансовите технологии и новите тенденции в консултирането.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Образование</h2>
        <p style={styles.text}>
          <strong>Икономическа гимназия</strong><br />
          Разград, България<br />
          Училище: Професионална гимназия по икономика - ПГИ Робер Шуман<br />
          Специалност: Банково Дело<br />
          <strong>Завършил:</strong> 2018г.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Професионален Опит</h2>
        <div style={styles.job}>
          <p style={styles.jobTitle}>Куриер (Логистични услуги, опит с клиенти)</p>
          <p style={styles.company}>Delivaroo, Just Eat, Uber Eats</p>
          <p style={styles.date}>2019г. - 2024г.</p>
          <ul style={styles.bulletList}>
            <li>Изграждане на стабилни взаимоотношения с клиенти чрез навременна и точна комуникация, което ми помогна да развия доверие и лоялност у тях.</li>
            <li>Решаване на възникнали проблеми в реално време, което изискваше внимание към детайлите и бързо мислене.</li>
            <li>Прецизна организация и планиране, необходими за навременно и качествено изпълнение на задълженията.</li>
          </ul>
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Умения</h2>
        <ul style={styles.bulletList}>
          <li><strong>Логистика и доставка:</strong> Умения за ефективно планиране на маршрути и управление на времето.</li>
          <li><strong>Работа с клиенти:</strong> Създаване на позитивно обслужване и разрешаване на възникнали проблеми.</li>
          <li><strong>Компютърни умения:</strong> Опит в работата с GPS системи, основни компютърни програми и бързо адаптиране към нови технологии.</li>
        </ul>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Езици</h2>
        <ul style={styles.bulletList}>
          <li><strong>Български:</strong> Майчин език</li>
          <li><strong>Английски:</strong> Свободно владеене (писмено и говоримо)</li>
        </ul>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Интереси и Хобита</h2>
        <p style={styles.text}>Компютри и технологии: Интерес към софтуер, хардуер и иновации в технологиите.</p>
      </section>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Arial', sans-serif",
    color: "#333",
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto",
    lineHeight: "1.6",
  },
  header: {
    borderBottom: "2px solid #4A90E2",
    paddingBottom: "6px",
    marginBottom: "20px",
    textAlign: "center",
  },
  name: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#4A90E2",
  },
  contact: {
    fontSize: "14px",
    marginBottom: "-1px",
    color: "#555",
  },
  email: {
    color: "#4A90E2",
    textDecoration: "none",
  },
  section: {
    marginBottom: "20px",
  },
  sectionTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#333",
    borderBottom: "1px solid #ddd",
    paddingBottom: "5px",
    marginBottom: "10px",
  },
  text: {
    fontSize: "16px",
    color: "#555",
    margin: "10px 0",
  },
  job: {
    marginBottom: "10px",
  },
  jobTitle: {
    fontWeight: "bold",
    fontSize: "16px",
  },
  company: {
    fontSize: "14px",
    color: "#777",
  },
  date: {
    fontSize: "14px",
    color: "#777",
  },
  bulletList: {
    listStyleType: "disc",
    paddingLeft: "20px",
    color: "#555",
  },
};

export default Cv;

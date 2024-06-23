import Link from 'next/link'

import Header from '@/components/Header'
import Layout from '@/components/Layout'

import styles from './index.module.scss'

const Home = () => {
  return (
    <Layout theme="pink">
      <Header />
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Questionnaire</h2>
        <p className={styles.description}>
          Discover more about your relationship with our comprehensive questionnaire designed to deepen your
          understanding and connection.
        </p>
        <Link className={styles.link} href="/survey/question1">
          Let&#39;s go
        </Link>
      </div>
    </Layout>
  )
}

export default Home

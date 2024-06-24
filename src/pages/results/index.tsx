import { useRouter } from 'next/router'

import Header from '@/components/Header'
import Layout from '@/components/Layout'
import { questionsConfig } from '@/constants/config'
import { useAppDispatch, useAppSelector } from '@/store'
import { clearHistory, clearReverseHistory, getHistorySelector } from '@/store/surveyHistorySlice'
import { buildResultsList } from '@/utils/buildResultsList'
import { formatQuestion } from '@/utils/format/formatQuestion'

import styles from './results.module.scss'

const Results = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const responses = useAppSelector(getHistorySelector)
  const results = buildResultsList(questionsConfig, responses)

  const handleStartSurvey = () => {
    dispatch(clearHistory())
    dispatch(clearReverseHistory())
    router.push('/')
  }

  if (!responses) {
    return <h1 className={styles.placeholder}> You haven&#39;t finish it yet</h1>
  }

  return (
    <Layout theme="pink">
      <Header />
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Results</h1>
        <ul className={styles.list}>
          {results.map(result => (
            <li key={result.question.key}>
              <strong className={styles.question}>{formatQuestion(result.question, responses, questionsConfig)}</strong>
              <p className={styles.response}>{result.response}</p>
            </li>
          ))}
        </ul>
        <button className={styles.link} onClick={handleStartSurvey}>
          Try again
        </button>
      </div>
    </Layout>
  )
}

export default Results

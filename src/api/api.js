import axios from "axios"

// SQL実行関数
export const execSql = async (sql) => {
  const ret = await axios.get('https://noahs-garden.net/schedule/sql', {
    params: {
      sql: sql,
    },
  })
  return ret?.data?.rows
}

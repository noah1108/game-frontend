import MaterialTable from '@material-table/core'
import React, { forwardRef } from 'react'

const localizationJapanese = {
  error: 'エラー',
  body: {
    emptyDataSourceMessage: '表示するレコードがありません。',
    filterRow: {
      filterPlaceHolder: '',
      filterTooltip: 'フィルター',
    },
    editRow: {
      saveTooltip: '保存',
      cancelTooltip: 'キャンセル',
      deleteText: 'この行を削除しますか？',
    },
    addTooltip: '追加',
    deleteTooltip: '削除',
    editTooltip: '編集',
  },
  header: {
    // actions: 'アクション',
  },
  grouping: {
    groupedBy: 'グループ化:',
    placeholder: 'ヘッダーをドラッグ ...',
  },
  pagination: {
    firstTooltip: '最初のページ',
    firstAriaLabel: '最初のページ',
    previousTooltip: '前のページ',
    previousAriaLabel: '前のページ',
    nextTooltip: '次のページ',
    nextAriaLabel: '次のページ',
    labelDisplayedRows: '{from}-{to} 全{count}件',
    labelRowsPerPage: 'ページあたりの行数:',
    lastTooltip: '最後のページ',
    lastAriaLabel: '最後のページ',
  },
  toolbar: {
    addRemoveColumns: '列の追加、削除',
    nRowsSelected: '{0} 行選択',
    showColumnsTitle: '列の表示',
    showColumnsAriaLabel: '列の表示',
    exportTitle: '出力',
    exportAriaLabel: '出力',
    exportCSVName: 'CSV出力',
    exportPDFName: 'PDF出力',
    searchTooltip: '検索',
    searchPlaceholder: '検索',
    searchAriaLabel: '検索',
    clearSearchAriaLabel: 'クリア',
  },
}


/**
 * テーブル部品
 */
const Table = ({
  title = '',
  columns = [],
  data = [],
  actions = [],
  options = [],
  localization = [],
}) => {
  return (
    <MaterialTable
      // icons={TABLE_ICONS}
      title="Custom Edit Component Preview"
      columns={[
        {
          title: 'Name',
          field: 'name',
        },
        { title: 'Surname', field: 'surname' },
        { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
        {
          title: 'Birth Place',
          field: 'birthCity',
          lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
        },
      ]}
      data={[
        { id: '1', name: '1', surname: 'Baran', birthYear: 1987, birthCity: 63 },
        {
          id: '2',
          name: 'Zerya Betül',
          surname: 'Baran',
          birthYear: 2017,
          birthCity: 34,
        },
      ]}
      actions={[
        // {
        //   icon: () => <SaveAlt />,
        //   disabled: true,
        //   tooltip: 'Save User',
        //   isFreeAction: true,
        //   onClick: (event) => {
        //     alert(`Icon clicked`)
        //   },
        // },
      ]}
      localization={localizationJapanese}
      editable={{
        isEditable: (rowData) => true, // only name(a) rows would be editable
        isEditHidden: (rowData) => true,
        isDeletable: (rowData) => true, // only name(b) rows would be deletable,
        isDeleteHidden: (rowData) => true,
        // onBulkUpdate: (changes) => {
        //   return new Promise((resolve, reject) => {
        //     // Must return a Promise
        //   })
        // },
        // onRowAddCancelled: (rowData) => {
        //   return new Promise((resolve, reject) => {
        //     // Must return a Promise
        //   })
        // },
        // onRowUpdateCancelled: (rowData) => {
        //   return new Promise((resolve, reject) => {
        //     // Must return a Promise
        //   })
        // },
        // onRowAdd: (newData) => {
        //   return new Promise((resolve, reject) => {
        //     // Must return a Promise
        //   })
        // },
        // onRowUpdate: (newData, oldData) => {
        //   return new Promise((resolve, reject) => {
        //     // Must return a Promise
        //   })
        // },
        // onRowDelete: (oldData) => {
        //   return new Promise((resolve, reject) => {
        //     // Must return a Promise
        //   })
        // },
      }}
      options={{
        filtering: false,
        search: false,
      }}
    />
  )
}

export default Table

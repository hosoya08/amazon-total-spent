/* Amazonの注文履歴から使用金額を計算するツール
    2026年3月時点で動作確認が取れています

    基本的には１，２を繰り返して全ページの金額をまとめます
    最後のページで実行したら「grandTotal: 0000」のところに実行して取得した金額の合計が出力されます
*/



// １．金額を取得したいページのコンソールに最初に以下をペースト
window.amazonPageTotalSaver = () => {
    const total = [...document.querySelectorAll(".a-size-base.a-color-secondary.aok-break-word")]
        .map((el) => el.textContent.match(/￥([\d,]+)/))
        .filter(Boolean)
        .map((m) => Number(m[1].replace(/,/g, "")))
        .reduce((sum, price) => sum + price, 0)

    const pageKey = `amazon_total_page_${location.href}`
    localStorage.setItem(pageKey, total)

    const allKeys = Object.keys(localStorage).filter((k) => k.startsWith("amazon_total_page_"))
    const grandTotal = allKeys.reduce((sum, key) => sum + Number(localStorage.getItem(key) || 0), 0)

    console.log(`このページの合計: ${total} 円`)
    console.log(`保存済みページ合計: ${grandTotal} 円`)
    return { pageTotal: total, grandTotal }
}

// ２．上記を実行する（ペースト）
amazonPageTotalSaver()

// ３．別の年のを計算する場合、一度ローカルストレージに保存したものを削除する必要があるので以下を実行
Object.keys(localStorage)
    .filter((k) => k.startsWith("amazon_total_page_"))
    .forEach((k) => localStorage.removeItem(k))

console.log("Amazon集計データを削除しました")

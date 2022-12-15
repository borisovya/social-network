import React, {useState} from 'react'
import s from "./Paginator.module.css";

type propsType = {

    onPageChange: (p: number) => void
    totalItemsCount: number
    pageSize: number
    currentPage: number
    portionSize?: number
}

const Paginator = ({onPageChange,
                       totalItemsCount,
                       pageSize,
                       currentPage,
                       portionSize = 10
                   }: propsType) => {

    let pagesCount: number = Math.ceil(totalItemsCount / pageSize)

    let pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionLimit = (portionNumber - 1) * portionSize + 1
    let rightPortionLimit = portionNumber * portionSize


    return <div className={s.paginator}>
        {portionNumber > 1 &&
            <button
                className={s.buttonChangePortion}
                onClick={() => {
                    setPortionNumber(portionNumber - 1)
                }}
            >
                {'< PREV'}
            </button>
        }

        {pages
            .filter(p => p >= leftPortionLimit && p <= rightPortionLimit)
            .map(p => {
                return (
                    <button
                        key={p}
                        className={`${currentPage === p && s.selectedPage} ${s.pageNumber}`}
                        onClick={() => {
                            onPageChange(p)
                        }}
                    >
                        {p}
                    </button>
                )
            })}

        {portionCount > portionNumber &&
            <button
                className={s.buttonChangePortion}
                onClick={() => {
                    setPortionNumber(portionNumber + 1)
                }}
            >
                {'NEXT >'}
            </button>
        }

    </div>

}

export default Paginator
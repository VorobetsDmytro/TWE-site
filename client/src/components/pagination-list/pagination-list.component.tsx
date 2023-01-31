import { FC, useCallback, useEffect, useState } from "react";

import style from './pagination-list.style.module.scss'
import { NavLink } from "react-router-dom";

interface IPaginationListComponent {
    currentPage: number;
    limit: number;
    total: number;
    queryParamsName: string;
}

export const PaginationListComponent: FC<IPaginationListComponent> = ({currentPage, limit, total, queryParamsName}) => {
    const [centerPages, setCenterPages] = useState<number[]>([]);

    const generateCenterPages = useCallback((): number[] => {
        const totalPages = Math.ceil(total / limit);
        if(totalPages <= 1)
            return [1];
        let arr: number[] = [];
        const start = 1;
        const end = totalPages;
        const left = Math.max(currentPage - 1, 1);
        const right = Math.min(currentPage + 1, end - 1);
        arr.push(start);
        if(start !== left)
            arr.push(left);
        if(currentPage !== start && currentPage !== end && currentPage !== left && currentPage !== right)
            arr.push(currentPage);
        if(right !== end && right !== left)
            arr.push(right);
        arr.push(end);
        if(arr[0] + 1 !== arr[1])
            arr.splice(1, 0, -1);
        if(arr[arr.length - 2] + 1 !== arr[arr.length - 1])
            arr.splice(arr.length - 1, 0, -1);
        return arr;
    }, [currentPage, limit, total]);

    useEffect(() => {
        setCenterPages(generateCenterPages());
    },[generateCenterPages, setCenterPages]);

    return (
        <ul className={style.pagination_list}>
            {centerPages.map((value, index) => {
                if(value === -1)
                    return (
                        <a key={index + Math.random()} style={{cursor: 'default'}}>
                            <li className={style.pagination_list_dots} key={index + Math.random()}>
                                <span>{'...'}</span>
                            </li>
                        </a>
                    );
                return (
                    <NavLink key={index + Math.random()} to={`?${queryParamsName}=${value}`}>
                        <li style={{backgroundColor: currentPage === value ? '#0073df' : ''}} key={index + Math.random()}>
                             <span>{value}</span>
                        </li>
                    </NavLink>
                )
            })}
        </ul>
    )
};
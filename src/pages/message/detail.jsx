import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";

import Meta from "../../components/Meta";
import { GET_MESSAGES } from "../../graphql/query/message";
import Link from "../../components/Link";
import gnbs from "../../json/message_gnb.json";
import { FormCheckbox } from "../../components/Form";
import Paginate from "../../components/Paginate";

/**
 * 메세지 화면 컴포넌트
 *
 */
const MessagePage = ({ location: { search } }) => {
    const displayName = "fr-message";

    const searchParams = new URLSearchParams(search);

    const type = searchParams.get("page");

    const userType = searchParams.get("user");

    if (type === null) {
        return (
            <div>
                <span>&nbsp;잘못된 접근입니다.</span>
            </div>
        );
    }
    const limit = 10;

    const [currentPage, setCurrentPage] = useState(1);

    const { data } = useQuery(GET_MESSAGES, {
        variables: {
            limit,
            offset: (currentPage - 1) * limit,
            type
        }
    });

    useEffect(() => {
        if (currentPage > 1) {
            setCurrentPage(1);
        }
    }, [type]);

    return (
        <>
            <Meta title="Frisklog" />
            <div className="fr-main__title">
                <h2>메세지</h2>
            </div>
            <ul className={`${displayName}__menu`}>
                {gnbs.map((gnb) => (
                    <li
                        className={`${displayName}__gnb`}
                        key={`${displayName}Gnb${gnb.id}`}
                    >
                        <Link
                            isInternal={true}
                            path={`/message?page=${gnb.page}&user=${gnb.userType}`}
                            ariaLabel={gnb.ariaLabel}
                            className={`${displayName}__link`}
                            activeClassName={`${displayName}__link--active`}
                            isActive={(_, { search }) => {
                                if (search) {
                                    const searchParams = new URLSearchParams(
                                        search
                                    );

                                    const page = searchParams.get("page");

                                    return page === gnb.page;
                                }
                            }}
                        >
                            {gnb.title}
                        </Link>
                    </li>
                ))}
            </ul>
            <div className="fr-grid__wrapper">
                <header className="fr-grid__header"></header>
                <form>
                    <table
                        className="fr-grid"
                        cellPadding="0"
                        cellSpacing="0"
                        border="0"
                    >
                        <colgroup>
                            <col width="25" />
                            <col width="*" />
                            <col width="200" />
                            <col width="110" />
                            <col width="110" />
                        </colgroup>
                        <thead>
                            <tr>
                                <th>
                                    <FormCheckbox label="" id="all" />
                                </th>
                                <th>보낸 사람</th>
                                <th>메세지 내용</th>
                                <th>보낸 시각</th>
                                <th>읽은 시각</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.messages.pageInfo.totalCount === 0 && (
                                <tr>
                                    <td colSpan={6}>
                                        메세지가 존재하지 않습니다.
                                    </td>
                                </tr>
                            )}
                            {data?.messages.nodes.map((node, index) => (
                                <tr key={`tableRow${index}`}>
                                    <td>
                                        <FormCheckbox
                                            label=""
                                            name="message"
                                            id={`message${node.id}`}
                                            value={node.id}
                                        />
                                    </td>
                                    <td>{node[userType].nickname}</td>

                                    <td>
                                        <div className="fr-grid__message">
                                            {node.content}
                                        </div>
                                    </td>
                                    <td>{node.createdAt}</td>
                                    <td>{node.readedTime}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </form>

                {data?.messages.pageInfo.totalCount > 0 && (
                    <footer className="fr-grid__footer">
                        <div className="fr-grid__column">
                            <Paginate
                                {...data.messages.pageInfo}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                            />
                        </div>
                    </footer>
                )}
            </div>
        </>
    );
};

export default MessagePage;

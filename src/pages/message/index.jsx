import React, { useState, useCallback, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";

import Meta from "../../components/Meta";
import { GET_MESSAGES } from "../../graphql/query/message";
import { DELETE_MESSAGES } from "../../graphql/mutation/message";
import Link from "../../components/Link";
import gnbs from "../../json/message_gnb.json";
import { FormCheckbox } from "../../components/Form";
import Paginate from "../../components/Paginate";
import Button from "../../components/button";
import Checkbox from "../../components/Checkbox";
import { useDispatch } from "../../context";
import { getStorage, TOKEN_KEY } from "../../lib/cookie";
import { graphqlError } from "../../lib/error";
import { SHOW_LOGIN_MODAL } from "../../context/action";

/**
 * 메세지 화면 컴포넌트
 *
 */
const MessagePage = ({ location: { search } }) => {
    const displayName = "fr-message";

    const dispatch = useDispatch();

    const [del, { loading }] = useMutation(DELETE_MESSAGES);

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

    const [messages, setMessages] = useState([]);

    const { data } = useQuery(GET_MESSAGES, {
        variables: {
            limit,
            offset: (currentPage - 1) * limit,
            type
        }
    });

    const handleChangeCheckbox = useCallback(
        (e) => {
            const checked = e.target.checked;

            const id = e.target.value;

            setMessages((prev) =>
                prev.map((msg) => {
                    if (msg.id === id) {
                        return {
                            ...msg,
                            checked
                        };
                    }

                    return msg;
                })
            );
        },
        [messages]
    );

    const handleChangeAllCheckbox = useCallback(
        (e) => {
            const checked = e.target.checked;

            let allMsg;
            if (checked) {
                allMsg = messages.map((msg) => ({ ...msg, checked: true }));
            } else {
                allMsg = messages.map((msg) => ({ ...msg, checked: false }));
            }
            setMessages(allMsg);
        },
        [messages]
    );

    const handleRemoveMessages = useCallback(async () => {
        if (loading) {
            return alert("요청 중입니다. 잠시만 기다려주세요.");
        }

        const checkedMsg = messages
            .filter((msg) => msg.checked)
            .map((msg) => msg.id);

        if (checkedMsg.length === 0) {
            return alert("메세지를 선택하세요.");
        }

        const token = getStorage(TOKEN_KEY);

        if (token === null) {
            return dispatch({
                type: SHOW_LOGIN_MODAL
            });
        }

        const tf = confirm("선택한 메세지를 삭제하시겠습니까?");

        if (tf) {
            try {
                await del({
                    variables: { messages: checkedMsg }
                });

                alert("메세지가 삭제되었습니다.");

                location.reload();
            } catch (error) {
                graphqlError({ error, dispatch });
            }
        }
    }, [loading, messages]);

    useEffect(() => {
        if (currentPage > 1) {
            setCurrentPage(1);
        }
    }, [type]);

    useEffect(() => {
        if (data) {
            const msgs = data.messages.nodes.map((msg) => ({
                ...msg,
                checked: false
            }));

            setMessages(msgs);
        }
    }, [data]);

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
                <header className="fr-grid__header">
                    <div className="fr-grid__column">
                        <Button
                            type="button"
                            className="fr-btn--secondary"
                            onClick={handleRemoveMessages}
                        >
                            삭제
                        </Button>
                    </div>
                    <div className="fr-grid__column"></div>
                </header>
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
                                <FormCheckbox
                                    label=""
                                    id="all"
                                    name="all"
                                    onChange={handleChangeAllCheckbox}
                                />
                            </th>
                            <th>보낸 사람</th>
                            <th>메세지 내용</th>
                            <th>보낸 시각</th>
                            <th>읽은 시각</th>
                        </tr>
                    </thead>
                    <tbody>
                        {messages.length === 0 && (
                            <tr>
                                <td colSpan={6}>메세지가 존재하지 않습니다.</td>
                            </tr>
                        )}
                        {messages.map((msg, index) => (
                            <tr key={`tableRow${index}`}>
                                <td>
                                    <FormCheckbox
                                        label=""
                                        name="message"
                                        id={`message${msg.id}`}
                                        onChange={handleChangeCheckbox}
                                        checked={msg.checked}
                                        value={msg.id}
                                    />
                                </td>
                                <td>{msg[userType].nickname}</td>

                                <td>
                                    <div className="fr-grid__message">
                                        {msg.content}
                                    </div>
                                </td>
                                <td>{msg.createdAt}</td>
                                <td>{msg.readedTime}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

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

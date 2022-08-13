import React, { useState, useCallback, useEffect } from "react";

import { FormInput, FormTextArea } from "../Form";
import { useLazyQuery } from "@apollo/client";
import { GET_USERS } from "../../graphql/query/user";
import { useInput } from "../../hooks";
import Button from "../button";
import SearchUserItem from "../SearchUserItem";
import TextWithClose from "../TextWithClose";

/**
 *  메세지 페이지 사이드바 컴포넌트
 *
 */
const AsideMessage = () => {
    const [getUsers, { data }] = useLazyQuery(GET_USERS);

    const [nickname, setNickname] = useState("");

    const [searchedUsers, setSearchedUsers] = useState([]);

    const [receivers, setReceivers] = useState([]);

    const message = useInput("");

    const handleChange = useCallback(async (e) => {
        const nextVal = e.target.value;

        setNickname(nextVal);

        if (nextVal.length > 0) {
            getUsers({
                variables: {
                    limit: 10,
                    nickname: nextVal
                }
            });
        } else {
            setSearchedUsers([]);
        }
    }, []);

    const handleRemoveReceiver = useCallback((id) => {
        setReceivers((prevState) =>
            prevState.filter((receiver) => receiver.id !== id)
        );
    }, []);

    const handleCallback = useCallback((searchedUser) => {
        setReceivers((prevState) => [searchedUser, ...prevState]);

        setNickname("");

        setSearchedUsers([]);
    }, []);

    useEffect(() => {
        if (data?.users.nodes.length > 0) {
            setSearchedUsers(data.users.nodes);
        }
    }, [data]);

    return (
        <>
            <div className="fr-aside__title">
                <h2>메세지 보내기</h2>
            </div>
            <div className="fr-form__column">
                <FormInput
                    placeholder="닉네임을 입력하세요"
                    id="to"
                    autoComplete="off"
                    required
                    isExpand={true}
                    label="닉네임"
                    value={nickname}
                    onChange={handleChange}
                >
                    {searchedUsers.length > 0 && (
                        <ul className="fr-input__search">
                            {searchedUsers.map((user, index) => (
                                <SearchUserItem
                                    key={`searchedUser${index}`}
                                    {...user}
                                    callback={handleCallback}
                                />
                            ))}
                        </ul>
                    )}
                </FormInput>
                <div className="fr-form__column">
                    {receivers.map((receiver, index) => (
                        <TextWithClose
                            key={`receiver${index}`}
                            id={receiver.id}
                            text={receiver.nickname}
                            onClick={handleRemoveReceiver}
                        />
                    ))}
                </div>
                <div className="fr-form__column">
                    <FormTextArea
                        placeholder="메세지를 입력하세요."
                        id="message"
                        autoComplete="off"
                        label="메세지"
                        {...message}
                        style={{ height: 200 }}
                    />
                </div>
                <Button type="submit" className="fr-btn--primary">
                    메세지 보내기
                </Button>
            </div>
        </>
    );
};

export default AsideMessage;

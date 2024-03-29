import React from "react";

import { FormInput, FormCheckbox } from "../Form";
import Button from "../button";
import Loader from "../Loader";

/**
 * 로그인 프레젠터 컴포넌트
 *
 * @param {boolean}  props.mode    화면 모드(로그인 | 인증)
 * @param {boolean}  props.loading  로그인 요청 여부
 * @param {object}   props.email    이메일
 * @param {function} props.onSubmit 요청 핸들러
 */
const SignInPresenter = ({
    mode,
    loading,
    email,
    token,
    keep,
    onChangeKeep,
    onLogin,
    onVerify
}) => (
    <>
        {loading && <Loader />}
        <form onSubmit={mode === "로그인" ? onLogin : onVerify}>
            <div className="fr-form__column">
                <FormInput
                    type={mode === "로그인" ? "email" : "password"}
                    placeholder={`${
                        mode === "로그인" ? "이메일을" : "인증코드를"
                    } 입력하세요`}
                    id="email"
                    autoComplete="off"
                    required
                    label={mode === "로그인" ? "이메일" : "인증코드"}
                    isExpand={true}
                    value={mode === "로그인" ? email.value : token.value}
                    onChange={
                        mode === "로그인" ? email.onChange : token.onChange
                    }
                />
            </div>

            {mode === "로그인" && (
                <div className="fr-login__keep">
                    <FormCheckbox
                        label="로그인 유지"
                        id="keep"
                        checked={keep}
                        onChange={onChangeKeep}
                    />
                </div>
            )}

            <Button type="submit" className="fr-btn--primary">
                {mode}
            </Button>
        </form>
    </>
);

export default SignInPresenter;

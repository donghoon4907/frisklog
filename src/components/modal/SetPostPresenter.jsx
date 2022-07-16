import React from "react";
import { Modal, Button } from "react-bootstrap";

import { FormInput } from "../Form";
import Loader from "../Loader";
import Editor from "../Editor";
import Category from "../Category";
import { Close } from "../../assets/icon";

/**
 * 게시물 설정 모달 컨테이너 컴포넌트
 *
 * @param {string}   props.id
 * @param {boolean}   props.loading
 * @param {string}   props.category
 * @param {string}   props.content
 * @param {function} props.setContent
 * @param {function} props.onClose
 * @param {function} props.onSubmit
 */
const SetPostPresenter = ({
    id,
    loading,
    category,
    categories,
    content,
    setContent,
    onClose,
    onAddCategory,
    onRemoveCategory,
    onSubmit
}) => (
    <Modal onHide={onClose} show animation={false}>
        {loading && <Loader />}
        <Modal.Header closeButton>
            <Modal.Title>게시물 {id ? "수정" : "등록"}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Editor
                height="50vh"
                onChange={(content) => setContent(content)}
                initialValue={content}
            />
            <form onSubmit={onAddCategory}>
                <FormInput
                    placeholder="카테고리를 입력하세요"
                    id="category"
                    autoComplete="off"
                    {...category}
                    label="카테고리"
                >
                    <ul className="fr-category__container">
                        {categories.map((category, index) => (
                            <Category
                                key={`setPostCategory${index}`}
                                content={category}
                            >
                                <button
                                    type="button"
                                    onClick={() => onRemoveCategory(category)}
                                >
                                    <Close
                                        style={{
                                            marginLeft: 10,
                                            fill: "white",
                                            width: 20,
                                            height: 20
                                        }}
                                    />
                                    <span className="a11y-hidden">
                                        카테고리 삭제
                                    </span>
                                </button>
                            </Category>
                        ))}
                    </ul>
                </FormInput>
            </form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
                취소
            </Button>
            <Button variant="primary" onClick={onSubmit}>
                {id ? "수정" : "등록"}
            </Button>
        </Modal.Footer>
    </Modal>
);

export default SetPostPresenter;

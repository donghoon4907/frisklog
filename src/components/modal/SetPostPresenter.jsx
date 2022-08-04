import React from "react";
import Modal from "react-bootstrap/Modal";

import { FormInput } from "../Form";
import Loader from "../Loader";
import Editor from "../Editor";
import Button from "../button";
import CategoryWithClose from "../CategoryWithClose";
import { ModalHeader } from ".";

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
        <ModalHeader>{`게시물 ${id ? "수정" : "등록"}`}</ModalHeader>
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
                    isExpand={false}
                >
                    <ul className="fr-category__container">
                        {categories.map((category, index) => (
                            <CategoryWithClose
                                key={`setPostCategory${index}`}
                                content={category}
                                onClick={onRemoveCategory}
                            />
                        ))}
                    </ul>
                </FormInput>
            </form>
        </Modal.Body>
        <Modal.Footer>
            <div style={{ width: 100 }}>
                <Button
                    type="button"
                    className="fr-btn--warning"
                    onClick={onClose}
                >
                    취소
                </Button>
            </div>
            <div style={{ width: 100 }}>
                <Button
                    type="submit"
                    className="fr-btn--primary"
                    onClick={onSubmit}
                >
                    {id ? "수정" : "등록"}
                </Button>
            </div>
        </Modal.Footer>
    </Modal>
);

export default SetPostPresenter;

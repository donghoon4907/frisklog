import React from "react";
import { Modal, Button } from "react-bootstrap";
import { FormInput, FormTextArea } from "../Form";
import Loader from "../Loader";

/**
 * 공지사항 팝업 프레젠터 컴포넌트
 *
 * @Presenter
 * @author frisk
 * @param props.setNoticeLoading 등록 및 수정 요청 중 여부
 * @param props.removeNoticeLoading 삭제 요청 중 여부
 * @param props.action 팝업 모드
 * @param props.isMaster 운영자 여부
 * @param props.title 제목 입력을 위한 Hooks
 * @param props.description 내용 입력을 위한 Hooks
 * @param props.mdDescription 마크다운 내용
 * @param props.preview 미리보기
 * @param props.onShowEdit 수정 모드 전환 핸들러
 * @param props.onPreview 미리보기 핸들러
 * @param props.onClosePreview 미리보기 숨기기 핸들러
 * @param props.onClose 팝업 숨기기 핸들러
 * @param props.onDelete 삭제 요청 핸들러
 * @param props.onSubmit 등록 및 수정 요청 핸들러
 */
const SetNoticePresenter = ({
    setNoticeLoading,
    removeNoticeLoading,
    action,
    isMaster,
    title,
    description,
    mdDescription,
    preview,
    onShowEdit,
    onPreview,
    onClosePreview,
    onClose,
    onDelete,
    onSubmit
}) => (
    <Modal onHide={onClose} show animation={false}>
        {(setNoticeLoading || removeNoticeLoading) && <Loader />}
        <Modal.Header closeButton>
            <Modal.Title>
                {action.code === "readonly" || action.code === "modifiable"
                    ? title.value
                    : `공지사항 ${action.modalTitle}`}
            </Modal.Title>
        </Modal.Header>
        <form onSubmit={onSubmit}>
            <Modal.Body>
                {(action.code === "add" || action.code === "modify") && (
                    <FormInput
                        placeholder="제목을 입력하세요."
                        id="title"
                        required
                        autoComplete="off"
                        {...title}
                        label="제목"
                    />
                )}
                <FormTextArea
                    placeholder="내용을 입력하세요."
                    id="description"
                    required
                    autoComplete="off"
                    {...description}
                    rows="16"
                    label="내용"
                >
                    {(action.code === "readonly" ||
                        action.code === "modifiable") && (
                        <div
                            className="fr-modal-notice__description--readonly markdown-body"
                            dangerouslySetInnerHTML={{ __html: mdDescription }}
                        ></div>
                    )}
                    {preview && (
                        <div className="fr-modal-notice__description--readonly preview">
                            <div
                                dangerouslySetInnerHTML={{ __html: preview }}
                                className="markdown-body"
                            ></div>
                            <span aria-hidden="true" onClick={onClosePreview}>
                                ×
                            </span>
                        </div>
                    )}
                </FormTextArea>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    취소
                </Button>
                {(action.code === "readonly" ||
                    action.code === "modifiable") && (
                    <>
                        {isMaster && (
                            <Button variant="danger" onClick={onDelete}>
                                삭제
                            </Button>
                        )}
                        <Button
                            variant="primary"
                            onClick={isMaster ? onShowEdit : onClose}
                        >
                            {isMaster ? "수정" : "확인"}
                        </Button>
                    </>
                )}
                {(action.code === "modify" || action.code === "add") && (
                    <>
                        <Button
                            variant="info"
                            onClick={preview ? onClosePreview : onPreview}
                        >
                            {preview ? "미리보기 취소" : "미리보기"}
                        </Button>
                        <Button variant="primary" type="submit">
                            {action.code === "add" ? "등록" : "수정"}
                        </Button>
                    </>
                )}
            </Modal.Footer>
        </form>
    </Modal>
);

export default SetNoticePresenter;

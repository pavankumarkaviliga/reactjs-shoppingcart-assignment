import * as React from "react";


export interface IUiModalProps {
    show: boolean,
    onClose ?: () => void,
    headerLabel ?: string
}

export const UiModal: React.SFC<IUiModalProps> = ({ children, show, onClose, headerLabel }) => {
    const cssClassNames = show ? "modal show" : "modal";
    return <>{show ? <div className={cssClassNames}>
        <div className="modal-header">
            <div className="header-label">{headerLabel ? headerLabel : 'Modal'}</div>
            <span className="close" onClick={() => { typeof onClose === "function" ? onClose() : null }}>&times;</span>
        </div>
        <div className="modal-content">
            {children}
        </div>
    </div> : null}</>
}

export default UiModal;
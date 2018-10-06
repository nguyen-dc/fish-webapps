import * as React from 'react';
import { Modal, Button, Glyphicon } from 'react-bootstrap';

interface ConfirmButtonProps {
    className?: string,
    bsStyle?: string,
    glyph?: string,
    buttonTitle?: string,
    yesButtonTitle?: string,
    noButtonTitle?: string,
    modalTitle?: string,
    modalBodyContent?: any,
    modalFooterContent?: any,
    onClickYes?: Function,
    onClickNo?: Function,
    isAutoCloseModal?: boolean,
    isDisabled?: boolean,
    isLoading?: boolean
}
interface ConfirmButtonStates {
    className: string,
    isOpenPopup: boolean,
    isShow: boolean,
    isAutoCloseModal: boolean,
    isDisabled?: boolean,
    isLoading?: boolean
}
export class ConfirmButton extends React.Component<ConfirmButtonProps, ConfirmButtonStates> {
    buttonTitle = '';
    yesButtonTitle = 'Tiếp tục';
    noButtonTitle = 'Không';
    modalTitle = 'Xác nhận';

    constructor(props: ConfirmButtonProps) {
        super(props)

        this.state = {
            className: props.className ? props.className : '',
            isOpenPopup: false,
            isShow: false,
            isAutoCloseModal: props.isAutoCloseModal ? props.isAutoCloseModal : true,
            isDisabled: props.isDisabled || false,
            isLoading: props.isLoading || false
        }
        if (props.buttonTitle)
            this.buttonTitle = props.buttonTitle;
        if (props.yesButtonTitle)
            this.yesButtonTitle = props.yesButtonTitle;
        if (props.noButtonTitle)
            this.noButtonTitle = props.noButtonTitle;
        if (props.modalTitle)
            this.modalTitle = props.modalTitle;
    }
    componentWillReceiveProps(newProps) {
        if (this.props.isDisabled != newProps.isDisabled) {
            this.setState({ isDisabled: newProps.isDisabled })
        }
        if (this.props.isLoading != newProps.isLoading) {
            this.setState({ isLoading: newProps.isLoading })
        }
    }
    onOpenModal(){
        this.setState({isShow: true});
    }
    onCloseModal(){
        this.setState({isShow: false});
    }
    onClickYes(){
        if(this.props.onClickYes) this.props.onClickYes();
        if(this.state.isAutoCloseModal){
            this.onCloseModal();
        }
    }
    onClickNo(){
        if(this.props.onClickNo) this.props.onClickNo();
        this.onCloseModal();
    }
    private renderPopup() {
        return <Modal show={this.state.isShow} onHide={() => this.onCloseModal()}
        className="modal-medium"
        aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">{this.modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {
                this.props.modalBodyContent ? 
                this.props.modalBodyContent : <span> {this.modalTitle} </span>
            }
        </Modal.Body>
        <Modal.Footer>
            <Button bsStyle="primary" onClick={() => this.onClickYes()}>{this.yesButtonTitle}</Button>
            <Button onClick={() => this.onClickNo()}>{this.noButtonTitle}</Button>
        </Modal.Footer>
    </Modal>
    }
    public render() {
        let { className } = this.state;
        let attrs = {
            bsStyle: this.props.bsStyle ? this.props.bsStyle : null,
            disabled: this.state.isDisabled ? this.state.isDisabled : null,
            className: this.state.className ? this.state.className : null,
        }
        return <Button {...attrs } onClick={() => this.onOpenModal()}>
            {
                this.props.glyph ? <Glyphicon glyph={this.props.glyph} /> : null
            }
            <span>{this.buttonTitle}</span>
            {this.renderPopup()}
        </Button>
    }
}
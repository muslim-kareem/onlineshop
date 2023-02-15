import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});




export default function ConformationDialog({close}:{
    close: ()=> void
}) {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div  >

            <Button
                type={"submit"}
                sx={{p: "0.2rem",
                backgroundColor: "#d4d9d8",
                color: "black",
                fontSize: '0.8rem',
                float: "right",
                mt: ".3rem"}}
                    onClick={handleClickOpen}>
                save this update
            </Button>

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Update"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        are you sure you want to Update this information to this product?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button type={"button"} onClick={(handleClose)}>NO</Button>
                    <Button type={"button"} onClick={() => {
                        close()
                        handleClose()
                    }}>YES</Button>
                </DialogActions>
            </Dialog>


        </div>

    );
}

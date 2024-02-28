import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Rating, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { Collapse, Alert, AlertTitle } from '@mui/material';

const Rate = ({ movie, canRate, handleRatingDialogClose, handleRatingSubmit, userRating, setUserRating, openAlert }) => {
    return (
        <Dialog fullWidth={true} maxWidth={'sm'} open={canRate} onClose={handleRatingDialogClose}>
            <DialogTitle align="center" sx={{ color: 'secondary.main', fontWeight: '600' }}>
                Rate This <span className="rate-movie-title">{movie.title}</span>
                <IconButton
                    edge="end"
                    onClick={handleRatingDialogClose}
                    sx={{ position: 'absolute', top: '16px', right: '32px' }}
                >
                    <CloseIcon sx={{ color: '#fff' }} />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Rating name="user-rating" value={userRating} size="large" onChange={(event, newValue) => setUserRating(newValue)} />
            </DialogContent>
            <DialogActions sx={{ width: '80%', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <Button disabled={userRating === 0} onClick={handleRatingSubmit} className="submit-rate">
                    Rate
                </Button>
            </DialogActions>
            <Collapse in={openAlert}>
                <Alert severity="success">
                    <AlertTitle>success</AlertTitle>
                    You Rated {userRating} for {movie.title}
                </Alert>
            </Collapse>
        </Dialog>
    );
};

export default Rate;

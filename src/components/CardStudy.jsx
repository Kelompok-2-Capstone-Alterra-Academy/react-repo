import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
// import { CardActionArea } from '@mui/material';
// import CardActions from '@mui/material/CardActions';
import imgFolder from '../assets/open-folder.png'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const CardStudy = () => {
    return (

        <Card sx={{ maxWidth: 200, minHeight: 170, borderRadius: 2.5, margin: 10 }}>
            <div style={{ paddingTop: 20, display: "flex" }}>
                <CardMedia
                    component="img"
                    alt="img-folder"
                    height="77"
                    image={imgFolder}
                    style={{ paddingLeft: 15, width: 77 }}
                />
                <MoreHorizIcon style={{ paddingLeft: 50, color: '#E0E0E0', fontSize: 35 }} />
            </div>
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    Matematika Dasar
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Lizards are a widesp
                </Typography>
            </CardContent>
        </Card>
    )
}

export default CardStudy
import PropTypes from 'prop-types';
import { toast } from "react-toastify";
import axios from "axios";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AiFillLike, AiFillDislike, AiFillMessage } from 'react-icons/ai'
import { MdShare } from 'react-icons/md'
import { HiTrash } from 'react-icons/hi'

import { alpha, styled } from '@mui/material/styles';
import { Box, Link, Card, Grid, Avatar, Typography, CardContent } from '@mui/material';

import { fDate } from '../../utils/formatTime';

import SvgIconStyle from '../../components/SvgIconStyle';
import MoreMenu from '../../components/MoreMenu';

const CardMediaStyle = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)',
});

const TitleStyle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
});

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2),
}));

const InfoStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled,
}));

const CoverImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default function PostCard({ post, index }) {
  const navigate = useNavigate();
  const { _id, comments, likes, created_by, imageUrl, createdAt, content } = post;
  const latestPostLarge = index === 0;
  const latestPost = index === 1 || index === 2;

  const POST_INFO = [
    { number: comments.length, icon: <AiFillMessage size={16} style={{marginRight: "0.5"}}/> },
    { number: likes.length, icon: <AiFillLike size={16} style={{marginRight: "0.5"}}/> },
    { number: 94, icon: <AiFillDislike size={16} style={{marginRight: "0.5"}}/> },
    { number: 78, icon: <MdShare size={16} style={{marginRight: "0.5"}}/> },
  ];

  const handleDeletePost = async () => {
    try {
      await axios.post("http://localhost:8000/post/delete", {
        id: _id,
      });
      window.location.reload();
      toast.success("delete post success!");
    } catch (error) {
      toast.error("delete post fail!");
    }
  };

  return (
    <Grid
      item
      xs={12}
      sm={latestPostLarge ? 12 : 6}
      md={latestPostLarge ? 6 : 3}
    >
      <Card sx={{ position: "relative" }} onClick={() => {
                    navigate("/postDetail", {
                      state: {
                        post,
                      },
                    })}}>
        <CardMediaStyle
          sx={{
            ...((latestPostLarge || latestPost) && {
              pt: "calc(100% * 4 / 3)",
              "&:after": {
                top: 0,
                content: "''",
                width: "100%",
                height: "100%",
                position: "absolute",
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
              },
            }),
            ...(latestPostLarge && {
              pt: {
                xs: "calc(100% * 4 / 3)",
                sm: "calc(100% * 3 / 4.66)",
              },
            }),
          }}
        >
          <SvgIconStyle
            color="paper"
            src="/static/icons/shape-avatar.svg"
            sx={{
              width: 80,
              height: 36,
              zIndex: 9,
              bottom: -15,
              position: "absolute",
              color: "background.paper",
              ...((latestPostLarge || latestPost) && { display: "none" }),
            }}
          />
          <AvatarStyle
            alt={created_by.fullname}
            src={created_by.avatar_url}
            sx={{
              ...((latestPostLarge || latestPost) && {
                zIndex: 9,
                top: 24,
                left: 24,
                width: 40,
                height: 40,
              }),
            }}
          />

          <CoverImgStyle alt="image" src={imageUrl} />
        </CardMediaStyle>

        <CardContent
          sx={{
            pt: 4,
            ...((latestPostLarge || latestPost) && {
              bottom: 0,
              width: "100%",
              position: "absolute",
            }),
          }}
        >
          <Typography
            gutterBottom
            variant="caption"
            sx={{ color: "text.disabled", display: "block" }}
          >
            {fDate(createdAt)}
          </Typography>

          <TitleStyle
            to="#"
            color="inherit"
            variant="subtitle2"
            underline="hover"
            component={RouterLink}
            sx={{
              ...(latestPostLarge && { typography: "h5", height: 60 }),
              ...((latestPostLarge || latestPost) && {
                color: "common.white",
              }),
            }}
          >
            {content}
          </TitleStyle>

          <InfoStyle>
            {POST_INFO.map((info, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  ml: index === 0 ? 0 : 1.5,
                  ...((latestPostLarge || latestPost) && {
                    color: "grey.500",
                  }),
                }}
              >
                {info.icon}
                <Typography variant="caption">
                  {info.number}
                </Typography>
              </Box>
            ))}
            <MoreMenu array={[{title: "Delete", icon: <HiTrash />, action: {handleDeletePost}}]}/>
          </InfoStyle>
        </CardContent>
      </Card>
    </Grid>
  );
}

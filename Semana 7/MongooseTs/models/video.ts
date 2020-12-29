import { Schema } from 'mongoose';

var likeSchema = new Schema({
    usu_mail: {
        type: String
    },
    usu_nomb: {
        type: String,
        minlength: 20
    }
});

var commentSchema = new Schema({
    usu_info: likeSchema,
    usu_comment: {
        type: String,
        minlength: 20,
        maxlength: 200
    }
});

export var videoSchema = new Schema({
    vid_titulo: String,
    vid_desc: String,
    vid_link: String,
    vid_img: {
        type: String,
        default: 'image.jpg'
    },
    vid_likes: [
        likeSchema
    ],
    vid_coments: [
        commentSchema
    ]
}, { timestamps: true })
const { GetObjectCommand, PutObjectCommand, DeleteObjectCommand, ListObjectsV2Command, DeleteObjectsCommand } = require('@aws-sdk/client-s3');
const { s3 } = require('../../../configs/aws.config');
const { generateFileName, generateImageFileName } = require('../../../utils/generateName.util');
const { Readable } = require('stream');

const uploadToS3 = async (file) => {
    try {
        const fileKey = await generateFileName(file);

        const uploadParams = {
            Bucket: process.env.BUCKET_NAME,
            Key: fileKey,
            Body: file.buffer,
        };

        const command = new PutObjectCommand(uploadParams);
        const result = await s3.send(command);

        return { result, key: uploadParams.Key };

    } catch (error) {
        throw error;
    }
};

const getFromS3 = async (s3_key) => {
    try {
        const getParams = {
            Bucket: process.env.BUCKET_NAME,
            Key: s3_key
        };

        const command = new GetObjectCommand(getParams);
        const data = await s3.send(command);
        const chunks = [];

        for await (const chunk of data.Body) {
            chunks.push(chunk);
        }

        const fileBuffer = Buffer.concat(chunks);

        return {
            Body: fileBuffer,
            ContentType: data.ContentType
        };

    } catch (error) {
        throw error;
    }
};

const deleteFromS3 = async (key) => {
    try {
        const deleteParams = {
            Bucket: process.env.BUCKET_NAME,
            Key: key,
        };

        const command = new DeleteObjectCommand(deleteParams);

        await s3.send(command);

    } catch (error) {
        throw error;
    }
};

const uploadToS3ForMainPageImages = async (images) => {
    try {
        const uploadPromises = images.map(image => uploadArrayToS3(image, image.index));
        const results = await Promise.all(uploadPromises);
        return results;

    } catch (error) {
        throw error;
    }
};

const uploadArrayToS3 = async (file, index) => {
    try {
        const fileKey = await generateImageFileName(file, index);

        const uploadParams = {
            Bucket: process.env.BUCKET_NAME,
            Key: fileKey,
            Body: file.buffer,
        };

        const command = new PutObjectCommand(uploadParams);
        const result = await s3.send(command);

        return { result, key: uploadParams.Key };

    } catch (error) {
        throw error;
    }
};

const getArrayFromS3 = async (folderPath) => {
    try {
        const listParams = {
            Bucket: process.env.BUCKET_NAME,
            Prefix: folderPath,
        };

        const listCommand = new ListObjectsV2Command(listParams);
        const listResponse = await s3.send(listCommand);

        const objects = listResponse.Contents || [];
        const files = [];

        for (const object of objects) {
            if (object.Key.endsWith('.jpg') || object.Key.endsWith('.png')) {
                const getParams = {
                    Bucket: process.env.BUCKET_NAME,
                    Key: object.Key,
                };

                const getCommand = new GetObjectCommand(getParams);
                const data = await s3.send(getCommand);

                if (data.Body instanceof Readable) {
                    const chunks = [];
                    for await (const chunk of data.Body) {
                        chunks.push(chunk);
                    }
                    const fileBuffer = Buffer.concat(chunks);

                    files.push({
                        Key: object.Key,
                        Body: fileBuffer.toString('base64'),
                        ContentType: data.ContentType
                    });
                }
            }
        }

        return files;
    } catch (error) {
        throw error;
    }
};

const deleteFolderFromS3 = async (folderPath) => {
    try {
        const listParams = {
            Bucket: process.env.BUCKET_NAME,
            Prefix: folderPath,
        };

        const listCommand = new ListObjectsV2Command(listParams);
        const listResponse = await s3.send(listCommand);

        const objects = listResponse.Contents || [];

        if (objects.length === 0) {
            return
        };

        const deleteParams = {
            Bucket: process.env.BUCKET_NAME,
            Delete: {
                Objects: objects.map((object) => ({ Key: object.Key })),
            },
        };

        const deleteCommand = new DeleteObjectsCommand(deleteParams);
        await s3.send(deleteCommand);

    } catch (error) {
        throw error;
    }
};

module.exports = {
    uploadToS3,
    getFromS3,
    deleteFromS3,
    uploadToS3ForMainPageImages,
    getArrayFromS3,
    deleteFolderFromS3
};

const handleSubmit = async (e) => {
    setLoading(true)
    if (checkInputs('all')) {
        await axios.post(`${SERVER_URL}/postProperty`, {
            statusType: 'FOR_SALE',
            statusText: homeType,
            price: price,
            pricePerSqFt: (sizeScale.toLowerCase() == 'sqft' ? (price / size) : (price / (size * 43560))).toFixed(1),
            lotSize: size,
            lotAreaUnit: sizeScale.toLowerCase(),
            beds: beds,
            baths: baths,
            address: `${props.addressStreet}, ${props.addressCity}, ${props.addressState} ${props.addressZipCode}`,
            addressStreet: props.addressStreet,
            addressCity: props.addressCity,
            addressState: props.addressState,
            addressZipcode: props.addressZipCode,
            coordinates: {
                lat: props.coordinates.lat,
                lng: props.coordinates.lng,
            },
            ownerId: user._id
        })
            .then(async data => {
                const mainImg = new FormData()
                mainImg.append('newMainImg', mainImage)
                await axios.patch(`${SERVER_URL}/postPropertyMainImage/${data.data._id}`, mainImg)
                    .then(async res => {
                        console.log('main img');
                        console.log(res);
                        const otherImgs = new FormData();
                        otherImages.forEach(image => {
                            otherImgs.append('newOtherImages', image);
                        });
                        await axios.patch(`${SERVER_URL}/postPropertyOtherImages/${data.data._id}`, otherImgs)
                            .then(async res => {
                                console.log('other imgs');
                                console.log(res);
                                await axios.patch(`${SERVER_URL}/updateUser/${user.email}`, { yourProperties: [...user.yourProperties, data.data._id] })
                                    .then(resUser => {
                                        setUser(resUser.data)
                                        navigate(`../../properties/details/${res.data.address.replaceAll(' ', '-').replaceAll(',', '').replaceAll('/', '').replaceAll('?', '')}/${res.data._id}`)
                                    })
                            })
                    })

            })
        // props.setPropertyId('64bf54767ddbcab441138187')

    } else {
        window.scrollTo(0, 0)
    }
    setLoading(false)
}



























app.post('/postProperty', async (req, res) => {
    try {
        const prop = new Property({
            statusType: req.body.statusType,
            statusText: req.body.statusText,
            price: req.body.price,
            pricePerSqFt: req.body.pricePerSqFt,
            lotSize: req.body.lotSize,
            lotAreaUnit: req.body.lotAreaUnit,
            beds: req.body.beds,
            baths: req.body.baths,
            address: req.body.address,
            addressStreet: req.body.addressStreet,
            addressCity: req.body.addressCity,
            addressState: req.body.addressState,
            addressZipcode: req.body.addressZipCode,
            coordinates: req.body.coordinates,
            ownerId: req.body.ownerId
        })
        prop.save()
        res.status(200).send(prop)
        res.end()
    } catch (e) {
        res.status(500).send(`Error: ${e}`);
    }
})































app.patch('/postPropertyMainImage/:_id', upload.single('newMainImg'), async (req, res) => {
    try {
        console.log(req.file.filename);
        const property = await Property.findOneAndUpdate({ _id: req.params._id },
            { $set: { mainImage: req.file.filename } },
            { new: true })
        console.log(property);
        res.status(200).json(property)
    } catch (e) {
        res.status(500).end('An error occured. Please try again later')
    }
    res.end()
})

app.patch('/postPropertyOtherImages/:_id', upload.array('newOtherImages'), async (req, res) => {
    try {
        const otherImages = []
        // We append to the otherImages array the names of the new files uploaded
        if (req.files) {
            req.files.forEach((file) => {
                otherImages.push(file.filename)
            });
        }
        // We append to the otherImages array the names of the old files passed
        if (req.body.oldOtherImages) {
            Array(req.body.oldOtherImages).forEach((file) => {
                otherImages.push(file)
            });
        }
        const property = await Property.findOneAndUpdate({ _id: req.params._id },
            { $set: { otherImages: otherImages } },
            { new: true })
        res.status(200).json(property)
    } catch (e) {
        res.status(500).end('An error occured. Please try again later')
    }
    res.end()
})







const handleUpdate = async (e) => {
    setSubmitActive(true)
    if (checkInputs('all')) {
        try {
            // If the data updated is valid, we update the property.
            await axios.post(`${SERVER_URL}/updateProperty/${props.editProperty._id}`, {
                statusText: homeType,
                price: price,
                pricePerSqFt: (sizeScale.toLowerCase() == 'sqft' ? (price / size) : (price / (size * 43560))).toFixed(1),
                lotSize: size,
                lotAreaUnit: sizeScale.toLowerCase(),
                beds: beds,
                baths: baths, 
            })
                .then(async res => {
                    let newData = res
                    // If the main image was changed then we upload it and update the property
                    if (props.editProperty.mainImage != mainImage) {
                        const mainImg = new FormData()
                        mainImg.append('newMainImg', mainImage)
                        await axios.patch(`${SERVER_URL}/postPropertyMainImage/${props.editProperty._id}`, mainImg)
                            .then(res => newData = res)
                    }
                    // If the other images were changed then we upload the new ones and update the property
                    if (props.editProperty.otherImages != otherImages) {
                        const otherImgs = new FormData();
                        otherImages.forEach(image => {
                            if (typeof image === 'string') {
                                otherImgs.append('oldOtherImages', image);
                            } else {
                                otherImgs.append('newOtherImages', image);
                            }
                        });
                        await axios.patch(`${SERVER_URL}/postPropertyOtherImages/${props.editProperty._id}`, otherImgs)
                            .then(res => newData = res)
                    }
                    return newData
                })
                .then(newData => {

                    // Update the results
                    props.setResults(prevResults => prevResults.map(prop => {
                        if (prop._id == newData.data._id) {
                            return newData.data
                        } else {
                            return prop
                        }
                    }))
                    changeSuccessMessage('Property Updated!')
                    props.setEditProperty(false)
                    enableScroll()
                })
        } catch (e) {
            changeErrorMessage('An error occurred. Please try again.')
            props.setEditProperty(false)
            console.log(e);
        }
    } else {
        changeErrorMessage('Verify that every filed is filled')
        setSubmitActive(false)
    }
}





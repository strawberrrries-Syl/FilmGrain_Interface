file = dir('*.png');
len = length(file);



for index = 1:len
        
        nameNow = file(index).name;
        nameList = strsplit(nameNow, '_');

        rgbname = nameNow(3:len(nameNow));

        

        if nameList(1) == "R"
            r = imread(nameNow);
            g = imread("G_" + rgbname);
            b = inread("B_" + rgbname);

            picNow = cat(3,r(:,:,1),g(:,:,1),b(:,:,1));

            imwrite(picNow,rgbname);

            delete(nameNow, "G_" + rgbname, "B_" + rgbname)
        end
end


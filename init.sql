DROP TABLE IF EXISTS COLORS;
CREATE TABLE COLORS(
    ID SERIAL PRIMARY KEY NOT NULL, 
    COLOR VARCHAR(30) NOT NULL
);
INSERT INTO COLORS(COLOR) values
('Orange'),
('Yellow'),
('Green'),
('Cyan'),
('Blue'),
('Magenta'),
('Purple'),
('White'),
('Black'),
('Grey'),
('Silver'),
('Pink'),
('Maroon'),
('Brown'),
('Beige'),
('Tan'),
('Peach'),
('Lime'),
('Olive'),
('Turquoise'),
('Teal'),
('Navy blue'),
('Indigo'),
('Violet');

DROP TABLE IF EXISTS TIMEOFYEAR;
CREATE TABLE TIMEOFYEAR(
    ID SERIAL PRIMARY KEY NOT NULL, 
    TIMEOFYEAR VARCHAR(50) NOT NULL
);
INSERT INTO TIMEOFYEAR(TIMEOFYEAR) values
('Spring'),
('Summer'),
('Fall'),
('Winter'),
('Valentines Day'),
('St. Patricks Day'),
('Easter'),
('July 4th'),
('Halloween'),
('Thanksgiving'),
('Christmas');


DROP TABLE IF EXISTS WREATHS;
CREATE TABLE WREATHS(
    ID UUID PRIMARY KEY NOT NULL, 
    SIZE INT, PRICE INT, 
    PICTUREURL VARCHAR(255)
);

DROP TABLE IF EXISTS WREATHCOLORS;
CREATE TABLE WREATHCOLORS(
    ID UUID NOT NULL, 
    COLORID INT NOT NULL, 
    PRIMARY KEY (ID, COLORID),
    CONSTRAINT FK_ID
        FOREIGN KEY(ID)
            REFERENCES WREATHS(ID)
            ON DELETE CASCADE,
    CONSTRAINT FK_COLOR
        FOREIGN KEY(COLORID)
            REFERENCES COLORS(ID)
);

DROP TABLE IF EXISTS WREATHTIMES;
CREATE TABLE WREATHTIMES(
    ID UUID NOT NULL, 
    TIMEOFYEARID INT NOT NULL, 
    PRIMARY KEY (ID, TIMEOFYEARID),
    CONSTRAINT FK_ID
        FOREIGN KEY(ID)
            REFERENCES WREATHS(ID)
            ON DELETE CASCADE,
    CONSTRAINT FK_TIMEOFYEAR
        FOREIGN KEY(TIMEOFYEARID)
            REFERENCES TIMEOFYEAR(ID)
);
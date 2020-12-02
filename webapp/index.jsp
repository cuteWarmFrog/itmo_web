<%--
  Created by IntelliJ IDEA.
  User: livshits
  Date: 30.10.2020
  Time: 15:37
  To change this template use File | Settings | File Templates.
--%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <link rel="stylesheet" href="style.css">
    <script type="text/javascript" src="script.js"></script>
</head>
<body>
    <header>
        <p>Лившиц Виктор Алексеевич P3232 №2813</p>
    </header>

    <main>
        <div id="interface">
            <div id="graphic">
                <div>

                    <canvas width="800px" height="400px" id="graphicCanvas"></canvas>
                </div>
            </div>

            <div id="XYRChoice">
                <div id="form">
                    <div>
                        <label id="xLabel" for="x">X</label><br>
                        <input id="x" type="text" placeholder="-5 ... 3">
                    </div>

                    <div>
                        <label id="yLabel">Y</label><br>
                        <label for="y1">-5</label>
                        <input id="y1" type="radio" name="y" value="-5">

                        <label for="y2">-4</label>
                        <input id="y2" type="radio" name="y" value="-4">

                        <label for="y3">-3</label>
                        <input id="y3" type="radio" name="y" value="-3"><br>

                        <label for="y4">-2</label>
                        <input id="y4" type="radio" name="y" value="-2">

                        <label for="y5">-1</label>
                        <input id="y5" type="radio" name="y" value="-1">

                        <label for="y6"> 0</label>
                        <input id="y6" type="radio" name="y" value="0"><br>

                        <label for="y7"> 1</label>
                        <input id="y7" type="radio" name="y" value="1">

                        <label for="y8"> 2</label>
                        <input id="y8" type="radio" name="y" value="2">

                        <label for="y9"> 3</label>
                        <input id="y9" type="radio" name="y" value="3">
                    </div>

                    <div>
                        <label id="rLabel">R</label><br>

                        <label for="r1">1</label>
                        <input id="r1" type="radio" name="r" value="1">

                        <label for="r2">1.5</label>
                        <input id="r2" type="radio" name="r" value="1.5">

                        <label for="r3">2</label>
                        <input id="r3" type="radio" name="r" value="2">

                        <label for="r4">2.5</label>
                        <input id="r4" type="radio" name="r" value="2.5">

                        <label for="r5">3</label>
                        <input id="r5" type="radio" name="r" value="3">
                    </div>
                    <button id="submit">Check</button>
                </div>
            </div>
        </div>

        <table id="table">
            <tr>
                <td>X</td>
                <td>Y</td>
                <td>R</td>
                <td>Result</td>
                <td>Time</td>
            </tr>
            <c:forEach var="node" items="${sessionScope.recordKeeper.results}">
                <tr>
                    <td>${node.x}</td>
                    <td>${node.y}</td>
                    <td>${node.r}</td>
                    <td>${node.hit}</td>
                    <td>${node.time}</td>
                </tr>
            </c:forEach>
        </table>
    </main>

    <footer>

    </footer>
</body>
</html>

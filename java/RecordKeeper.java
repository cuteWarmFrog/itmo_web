import java.io.Serializable;
import java.util.ArrayList;

public class RecordKeeper implements Serializable {

    private ArrayList<Node> results;

    public ArrayList<Node> getResults() {
        return results;
    }

    public void setResults(ArrayList<Node> results) {
        this.results = results;
    }

    public RecordKeeper() {
        results = new ArrayList<>();
    }

    public void addNode(double x, double y, double r, boolean isHit, long time) {
        results.add(new Node(x, y, r, isHit, time));
    }

    public static class Node {
        private double x;
        private double y;
        private double r;
        private boolean isHit;
        private long time;

        public Node(double x, double y, double r, boolean isHit, long time) {
            this.x = x;
            this.y = y;
            this.r = r;
            this.isHit = isHit;
            this.time = time;
        }

        public double getX() {
            return x;
        }

        public void setX(double x) {
            this.x = x;
        }

        public double getY() {
            return y;
        }

        public void setY(double y) {
            this.y = y;
        }

        public double getR() {
            return r;
        }

        public void setR(double r) {
            this.r = r;
        }

        public boolean isHit() {
            return isHit;
        }

        public void setHit(boolean hit) {
            isHit = hit;
        }

        public long getTime() {
            return time;
        }

        public void setTime(long time) {
            this.time = time;
        }
    }
}
